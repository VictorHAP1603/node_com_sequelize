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
  // await User.destroy({
  //   where: {
  //     age: {
  //       [Op.lt]: 18,
  //     },
  //   },
  // });

  const users = await User.findAll();

  return res.render("pages/cadastro", {
    users,
  });
};

export const register = async (req: Request, res: Response) => {
  // try {
  //   if (!name) throw new Error();
  // } catch (err) {
  //   console.log(err);
  // }

  const { name, age } = req.body;

  const [user, created] = await User.findOrCreate({
    where: { name },
    defaults: {
      age,
    },
  });

  res.redirect("/cadastro");
};

// Ações

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await User.destroy({
      where: {
        id,
      },
    });

    return res.redirect("/cadastro");
  } catch (err) {}
};

export const increment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (user) {
      user.age++;
      user.save();
    }

    return res.redirect("/cadastro");
  } catch (err) {}
};

export const decrement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id: id } });
    if (user) {
      user.age--;

      user.save();
    }

    return res.redirect("/cadastro");
  } catch (err) {}
};
