import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import geraHashSalt from "../config/auth";

const prisma = new PrismaClient();

class UsuarioController {
  public async create(request: Request, response: Response) {
    try {
      const { nome, email, dataNascimento, senha } = request.body;
      const { hash, salt } = geraHashSalt(senha);

      const novoUsuario = await prisma.usuario.create({
        data: {
          nome: nome,
          email: email,
          dataNascimento: new Date(dataNascimento),
          hash: hash,
          salt: salt,
        },
      });

      return response.status(201).json({
        email: novoUsuario.email,
        mensagem: "Usuário cadastrado com sucesso!",
      });
    } catch (error) {
      return response.status(500).json({
        mensagem: "Não foi possível cadastrar o usuário.",
      });
    }
  }
}

export const usuarioController = new UsuarioController();
