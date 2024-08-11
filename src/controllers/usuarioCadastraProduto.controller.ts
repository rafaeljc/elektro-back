import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class UsuarioCadastraProdutoController {
  public async create(request: Request, response: Response) {
    try {
      const { idUsuario, idProduto } = request.params;

      const produto = await prisma.produto.update({
        where: {
          id: Number(idProduto)
        },
        data: {
          usuarioId: Number(idUsuario)
        }
      });

      return response.status(201).json({
        mensagem: "Relação usuário cadastra produto inserida com sucesso!",
      });
    } catch (error) {
      return response.status(500).json({
        mensagem: "Não foi possível inserir a relação usuário cadastra produto.",
      });
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { idProduto } = request.params;

      const produto = await prisma.produto.update({
        where: { 
          id: Number(idProduto)
        },
        data: {
          usuarioId: null
        }
      });

      return response.status(200).json({
        mensagem: "Relação produto cadastrado por usuário removida com sucesso!",
      });
    } catch (error) {
      return response.status(500).json({
        mensagem: "Não foi possível remover a relação produto cadastrado por usuário."
      });
    }
  }
}

export const usuarioCadastraProdutoController = new UsuarioCadastraProdutoController();
