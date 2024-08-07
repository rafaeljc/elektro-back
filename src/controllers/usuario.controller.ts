import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import geraHashSalt from "../config/auth";

const prisma = new PrismaClient();

type InputUsuario = {
  nome?: string,
  email?: string,
  dataNascimento?: Date,
  hash?: string,
  salt?: string,
}

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

  public async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { nome, email, dataNascimento, senha } = request.body;
      
      // definindo informações que serão atualizadas
      let input: InputUsuario = {};
      if (nome) input.nome = nome;
      if (email) input.email = email;
      if (dataNascimento) input.dataNascimento = new Date(dataNascimento);
      if (senha) {
        const { hash, salt } = geraHashSalt(senha);
        input.hash = hash;
        input.salt = salt;
      }

      const usuarioAtualizado = await prisma.usuario.update({
        where: {
          id: Number(id)
        },
        data: input,
        select: {
          nome: true,
          email: true,
          dataNascimento: true,
        }
      });

      return response.status(200).json(usuarioAtualizado);
    } catch (error) {
      return response.status(500).json({
        mensagem: "Não foi possível atualizar os dados do usuário."
      });
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const usuarioRemovido = await prisma.usuario.delete({
        where: { 
          id: Number(id)
        },
        select: {
          nome: true,
          email: true,
          dataNascimento: true,
        }
      });

      return response.status(200).json(usuarioRemovido);
    } catch (error) {
      return response.status(500).json({
        mensagem: "Não foi possível remover o usuário."
      });
    }
  }
}

export const usuarioController = new UsuarioController();
