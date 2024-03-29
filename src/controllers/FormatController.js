import Format from "../models/format.js";
import user from '../security/auth.js'
import jwt from "jsonwebtoken";
import 'dotenv/config'


export default {
  async  auth(req, res) {
    try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send("Authorization header is missing!");
    }

    const [, hash] = authHeader.split(" ");
    const [email, password] = Buffer.from(hash, "base64").toString().split(":");
    console.log(email, password);
    console.log(process.env.AUTHORIZED_USER, process.env.AUTHORIZED_PASSWORD)
    const correctPassword = email === process.env.AUTHORIZED_USER && password === process.env.AUTHORIZED_PASSWORD;

    if (!correctPassword){
      return res.status(401).send("E-mail or password is incorrect!");
    }

    const token = await jwt.sign(
      { user: JSON.stringify(user) },
      process.env.PRIVATE_KEY,
      { expiresIn: '60m' }
    );

      return res.status(200).json({ data: { user, token } });
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },

 format(req, res) {
    try {
      const { user } = req.headers
      const { value, type } = req.body;
      const formattedValue = Format(value, type);
      
      if (formattedValue) {
        res.json({ formattedValue });
      } else {
        res
          .status(400)
          .json({ error: "Invalid format or unsupported type." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
}