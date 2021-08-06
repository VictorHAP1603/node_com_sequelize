import { Request, Response } from "express";
import { Op } from "sequelize"; // ajuda a fazer operações como o OU

import { User } from "../models/User";

import { Product } from "../models/Product";

export const home = async (req: Request, res: Response) => {
  // cadastrar

  const user = User.build({
    name: "Eduardo",
  });

  const idade = 10;
  user["age"] = idade;
  
  await user.save();

  // console.log("ID: " + user.id);

  let age: number = 90;
  let showOld: boolean = false;

  if (age > 50) {
    showOld = true;
  }

  let list = Product.getAll();
  let expensiveList = Product.getFromPriceAfter(12);

  res.render("pages/home", {
    name: "Bonieky",
    lastName: "Lacerda",
    showOld,
    products: list,
    expensives: expensiveList,
    frasesDoDia: [],
    // users,
  });

  // res.json(users);
};
