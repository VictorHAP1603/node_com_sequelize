import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/mysql";

export interface UserInstance extends Model {
  id: number;
  name: string;
  age: number;
}

export const User = sequelize.define<UserInstance>(
  "User",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      // get() {
      // quando for pegar os dados, passa por esse get
      //   return this.getDataValue("name").toLowerCase();
      // },
      // set(value: string) {

      // Quando for salvar algo, passa por esse set
      //   const nameLow = value.toLowerCase();

      //   this.setDataValue("name", nameLow);
      // },
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 18,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);
