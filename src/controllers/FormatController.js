import Format from "../models/format.js";
import tokenValited, { user, PRIVATE_KEY } from "../security/auth.js";
import jwt from "jsonwebtoken";
import express from "express";
const app = express();
export default {
  async  auth(req, res) {
    const [, hash] = req.headers.authorization?.split(" ") || [" ", " "];
    const [email, password] = Buffer.from(hash, "base64").toString().split(":");
    console.log(email, password);
    try {
      const correctPassword =
        email === "format@vitru.com" && password === "Vitru#2024";

      if (!correctPassword)
        return res.status(401).send("Password or E-mail incorrect!");

      const token = await jwt.sign(
        { user: JSON.stringify(user) },
        PRIVATE_KEY
        
      );

      return res.status(200).json({ data: { user, token } });
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },

  format(req, res) {
    const app = express();
    app.use('*', tokenValited);
    
    try {
      const { numero, tipo } = req.body;
      const { user } = req.headers
      const numeroFormatado = Format(numero, tipo);

      if (numeroFormatado) {
        res.json({ numeroFormatado });
      } else {
        res
          .status(400)
          .json({ erro: "Formato inválido ou tipo não suportado." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro interno do servidor." });
    }
  }
}