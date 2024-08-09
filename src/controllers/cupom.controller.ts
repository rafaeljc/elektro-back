import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import util from "../config/util";

const prisma = new PrismaClient();

type InputCupom = {
  codigo?: string,
  nome?: string,
  descricao?: string,
  desconto?: number,
  dataValidade?: Date,
  jaUtilizado?: boolean,
  compraMinima?: number,
  freteGratis?: boolean,
}

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
          dataValidade: util.parseDate(dataValidade),
          jaUtilizado: util.parseBoolean(jaUtilizado),
          compraMinima: parseFloat(compraMinima),
          freteGratis: util.parseBoolean(freteGratis),
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

  public async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { codigo, nome, descricao, desconto, dataValidade, 
        jaUtilizado, compraMinima, freteGratis } = request.body;
      
      // definindo informações que serão atualizadas
      let input: InputCupom = {};
      if (codigo) input.codigo = codigo;
      if (nome) input.nome = nome;
      if (descricao) input.descricao = descricao;
      if (desconto) input.desconto = parseFloat(desconto);
      if (dataValidade) input.dataValidade = util.parseDate(dataValidade);
      if (jaUtilizado) input.jaUtilizado = util.parseBoolean(jaUtilizado);
      if (compraMinima) input.compraMinima = parseFloat(compraMinima);
      if (freteGratis) input.freteGratis = util.parseBoolean(freteGratis);

      const cupomAtualizado = await prisma.cupom.update({
        where: {
          id: Number(id)
        },
        data: input,
        select: CupomController.selectPadrao
      });

      return response.status(200).json(cupomAtualizado);
    } catch (error) {
      return response.status(500).json({
        mensagem: "Não foi possível atualizar os dados do cupom."
      });
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const cupomRemovido = await prisma.cupom.delete({
        where: { 
          id: Number(id)
        },
        select: CupomController.selectPadrao
      });

      return response.status(200).json(cupomRemovido);
    } catch (error) {
      return response.status(500).json({
        mensagem: "Não foi possível remover o cupom."
      });
    }
  }
}

export const cupomController = new CupomController();
