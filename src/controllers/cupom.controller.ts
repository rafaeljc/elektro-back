import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import parseBoolean from "../config/util";

const prisma = new PrismaClient();

class CupomController {
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
}

export const cupomController = new CupomController();
