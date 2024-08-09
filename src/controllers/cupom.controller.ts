import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import parseBoolean from "../config/util";

const prisma = new PrismaClient();

class CupomController {
  private static selectPadrao = {
    codigo: true,
    nome: true,
    descricao: true,
    desconto: true,
    dataValidade: true,
    jaUtilizado: true,
    compraMinima: true,
    freteGratis: true,
  }

  public async create(request: Request, response: Response) {
    try {
      const { codigo, nome, descricao, desconto, dataValidade, 
        jaUtilizado, compraMinima, freteGratis } = request.body;

      const novoCupom = await prisma.cupom.create({
        data: {
          codigo: codigo,
          nome: nome,
          descricao: descricao,
          desconto: parseFloat(desconto),
          dataValidade: new Date(dataValidade),
          jaUtilizado: parseBoolean(jaUtilizado),
          compraMinima: parseFloat(compraMinima),
          freteGratis: parseBoolean(freteGratis),
        },
        select: {
          id: true
        }
      });

      return response.status(201).json({
        id: novoCupom.id,
        mensagem: "Cupom cadastrado com sucesso!",
      });
    } catch (error) {
      return response.status(500).json({
        mensagem: "Não foi possível cadastrar o cupom.",
      });
    }
  }

  public async read(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const cupom = await prisma.cupom.findUnique({
        where: { 
          id: Number(id)
        },
        select: CupomController.selectPadrao
      });

      if (!cupom) {
        return response.status(404).json({
          mensagem: "Cupom não cadastrado.",
        });
      }

      return response.status(200).json(cupom);
    } catch (error) {
      return response.status(500).json({
        mensagem: "Não foi possível buscar o cupom."
      });
    }
  }

  public async readAll(request: Request, response: Response) {
    try {
      const cupons = await prisma.cupom.findMany({
        select: {
          id: true,
          codigo: true,
          nome: true,
          descricao: true,
          desconto: true,
          dataValidade: true,
          jaUtilizado: true,
          compraMinima: true,
          freteGratis: true,
        }
      });
      return response.status(200).json(cupons);
    } catch (error) {
      return response.status(500).json({
        mensagem: "Não foi possível buscar todos cupons."
      });
    }
  }
}

export const cupomController = new CupomController();
