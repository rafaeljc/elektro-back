import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import parseBoolean from "../config/util";

const prisma = new PrismaClient();

type InputProduto = {
  nome?: string,
  descricao?: string,
  preco?: number,
  ehNovo?: boolean,
  imagem?: string,
}

class ProdutoController {
  private static selectPadrao = {
    nome: true,
    descricao: true,
    preco: true,
    ehNovo: true,
    imagem: true,
  }

  public async create(request: Request, response: Response) {
    try {
      const { nome, descricao, preco, ehNovo, imagem } = request.body;

      const novoProduto = await prisma.produto.create({
        data: {
          nome: nome,
          descricao: descricao,
          preco: parseFloat(preco),
          ehNovo: parseBoolean(ehNovo),
          imagem: imagem,
        },
        select: {
          id: true
        }
      });

      return response.status(201).json({
        id: novoProduto.id,
        mensagem: "Produto cadastrado com sucesso!",
      });
    } catch (error) {
      return response.status(500).json({
        mensagem: "Não foi possível cadastrar o produto.",
      });
    }
  }

  public async read(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const produto = await prisma.produto.findUnique({
        where: { 
          id: Number(id)
        },
        select: ProdutoController.selectPadrao
      });

      if (!produto) {
        return response.status(404).json({
          mensagem: "Produto não cadastrado.",
        });
      }

      return response.status(200).json(produto);
    } catch (error) {
      return response.status(500).json({
        mensagem: "Não foi possível buscar o produto."
      });
    }
  }

  public async readAll(request: Request, response: Response) {
    try {
      const produtos = await prisma.produto.findMany({
        select: {
          id: true,
          nome: true,
          descricao: true,
          preco: true,
          ehNovo: true,
          imagem: true,
        }
      });
      return response.status(200).json(produtos);
    } catch (error) {
      return response.status(500).json({
        mensagem: "Não foi possível buscar todos produtos."
      });
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { nome, descricao, preco, ehNovo, imagem } = request.body;
      
      // definindo informações que serão atualizadas
      let input: InputProduto = {};
      if (nome) input.nome = nome;
      if (descricao) input.descricao = descricao;
      if (preco) input.preco = parseFloat(preco);
      if (ehNovo) input.ehNovo = parseBoolean(ehNovo);
      if (imagem) input.imagem = imagem;

      const produtoAtualizado = await prisma.produto.update({
        where: {
          id: Number(id)
        },
        data: input,
        select: ProdutoController.selectPadrao
      });

      return response.status(200).json(produtoAtualizado);
    } catch (error) {
      return response.status(500).json({
        mensagem: "Não foi possível atualizar os dados do produto."
      });
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const produtoRemovido = await prisma.produto.delete({
        where: { 
          id: Number(id)
        },
        select: ProdutoController.selectPadrao
      });

      return response.status(200).json(produtoRemovido);
    } catch (error) {
      return response.status(500).json({
        mensagem: "Não foi possível remover o produto."
      });
    }
  }
}

export const produtoController = new ProdutoController();
