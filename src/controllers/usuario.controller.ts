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

  public async read(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const usuario = await prisma.usuario.findUnique({
        where: { 
          id: Number(id)
        },
        select: {
          id: true,
          nome: true,
          email: true,
          dataNascimento: true,
        }
      });

      if (!usuario) {
        return response.status(404).json({
          mensagem: "Usuário não cadastrado.",
        });
      }

      return response.status(200).json(usuario);
    } catch (error) {
      return response.status(500).json({
        mensagem: "Não foi possível buscar o usuário."
      });
    }
  }

  public async readAll(request: Request, response: Response) {
    try {
      const usuarios = await prisma.usuario.findMany({
        select: {
          id: true,
          nome: true,
          email: true,
          dataNascimento: true,
        }
      });
      return response.status(200).json(usuarios);
    } catch (error) {
      return response.status(500).json({
        mensagem: "Não foi possível buscar todos usuários."
      });
    }
  }
}

export const usuarioController = new UsuarioController();
