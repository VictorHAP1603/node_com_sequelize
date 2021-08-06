import { Request, Response } from "express";
import { Op } from "sequelize"; // ajuda a fazer operações como o OU

import { User } from "../models/User";

import { Product } from "../models/Product";

export const home = async (req: Request, res: Response) => {
  // let users = await User.findAll();

  // let users = await User.findAll({
  //   attributes: ["name", "age"],
  // });

  // let users = await User.findAll({
  //   attributes: { exclude: ["id"] },
  // });

  let users = await User.findAll({
    where: {
      // age: {
      //   [Op.or]: [20, 60],
      // },
      // [Op.or]: [{ age: 18 }, { age: 60 }],
      // age: [18, 20, 60],
      // age: {
      //   // [Op.gte]: 20,
      //   // [Op.lt]: 40
      //   // [Op.between]: [20, 60],
      //   // [Op.notBetween]: [20, 60],
      //   // [Op.in]: [18, 60],
      //   // [Op.notIn]: [18, 60],
      // },
      // name: {
      //   [Op.like]: ["vi%"],
      // },
    },
  });

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
    users,
  });

  // res.json(users);
};
