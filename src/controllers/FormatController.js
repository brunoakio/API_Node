const { response } = require("express");
const Format = require("../models/format");
const { user, PRIVATE_KEY, tokenValited } = require("../security/auth");
const jsonwebtoken = require("jsonwebtoken");
module.exports = {
  async format(req, res) {
    try {
      const { numero, tipo } = req.body;

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
  },
  async auth(req, res) {
    const [, hash] = req.headers.authorization?.split(" ") || [" ", " "];
    const [email, password] = Buffer.from(hash, "base64").toString().split(":");

    try {
      const correctPassword =
        email === "format@vitru.com" && password === "Vitru#2024";

      if (!correctPassword)
        return response.status(401).send("Password or E-mail incorrect!");

      const token = jsonwebtoken.sign(
        { user: JSON.stringify(user) },
        PRIVATE_KEY,
        { expireIn: "60m" }
      );

      return res.status(200).json({ data: { user, token } });
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
};
