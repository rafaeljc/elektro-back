import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class ProdutoController {
  private consigoConverterParaBooleano(valor: string) {
    // TODO:
    // - implementar middleware para fazer essa validação e depois
    //   substituir => ehNovo: this.consigoConverterParaBooleano(ehNovo) ? Boolean(ehNovo) : ehNovo
    //   por => 'ehNovo: Boolean(ehNovo)'
    //   obs: por hora, foi necessário fazer assim para garantir que 'ehNovo' vazio ou undefined
    //        não fosse interpretado equivocadamente como 'false'
    if (valor === "") return false;
    if (valor === undefined) return false;
    return true;
  }

  public async create(request: Request, response: Response) {
    try {
      const { nome, descricao, preco, ehNovo, imagem } = request.body;

      const novoProduto = await prisma.produto.create({
        data: {
          nome: nome,
          descricao: descricao,
          preco: parseFloat(preco),
          ehNovo: this.consigoConverterParaBooleano(ehNovo) ? Boolean(ehNovo) : ehNovo,
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
}

export const produtoController = new ProdutoController();
