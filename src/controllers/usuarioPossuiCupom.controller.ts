import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class UsuarioPossuiCupomController {
  public async create(request: Request, response: Response) {
    try {
      const { idUsuario, idCupom } = request.params;

      const cupom = await prisma.cupom.update({
        where: {
          id: Number(idCupom)
        },
        data: {
          usuarioId: Number(idUsuario)
        }
      });

      return response.status(201).json({
        mensagem: "Relação usuário possui cupom inserida com sucesso!",
      });
    } catch (error) {
      return response.status(500).json({
        mensagem: "Não foi possível inserir a relação usuário possui cupom.",
      });
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { idCupom } = request.params;

      const cupom = await prisma.cupom.update({
        where: { 
          id: Number(idCupom)
        },
        data: {
          usuarioId: null
        }
      });

      return response.status(200).json({
        mensagem: "Relação cupom possuído por usuário removida com sucesso!",
      });
    } catch (error) {
      return response.status(500).json({
        mensagem: "Não foi possível remover a relação cupom possuído por usuário."
      });
    }
  }
}

export const usuarioPossuiCupomController = new UsuarioPossuiCupomController();
