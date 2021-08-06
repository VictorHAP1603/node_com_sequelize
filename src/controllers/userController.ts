import { Request, Response } from "express";
import { Op } from "sequelize";
import { User } from "../models/User";

export const nome = (req: Request, res: Response) => {
  let nome: string = req.query.nome as string;
  let idade: string = req.query.idade as string;

  res.render("pages/nome", {
    nome,
    idade,
  });
};

export const idadeForm = (req: Request, res: Response) => {
  res.render("pages/idade");
};

export const idadeAction = (req: Request, res: Response) => {
  let mostrarIdade: boolean = false;
  let idade: number = 0;

  if (req.body.ano) {
    let anoNascimento: number = parseInt(req.body.ano as string);
    let anoAtual: number = new Date().getFullYear();
    idade = anoAtual - anoNascimento;
    mostrarIdade = true;
  }

  res.render("pages/idade", {
    idade,
    mostrarIdade,
  });
};

// Cadastro
export const registerPage = async (req: Request, res: Response) => {
  let dados = {
    name: "Victor Hugo",
    age: 20,
  };

  const result = await User.findAll({ where: { id: 17 } });
  if (result.length > 0) {
    let usuario = result[0];

    await usuario.destroy();
  }

  const users = await User.findAll();

  return res.render("pages/cadastro", {
    users,
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, age } = req.body;
    if (!name) throw new Error();

    const user = User.build({
      name,
      age,
    });
    await user.save();

    res.redirect("/cadastro");
  } catch (err) {
    console.log(err);
  }
};

// Delete

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error();

    await User.findAll({
      where: {
        id,
      },
    });
  } catch (err) {}
};
