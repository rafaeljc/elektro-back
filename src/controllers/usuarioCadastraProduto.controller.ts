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
}

export const usuarioCadastraProdutoController = new UsuarioCadastraProdutoController();
