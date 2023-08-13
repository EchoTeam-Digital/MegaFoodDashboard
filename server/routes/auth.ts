import express from "express";
import prisma from "../prisma";
const AuthRoute = express.Router();

AuthRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (checkEmail) {
      const checkPassword = await prisma.user.findUnique({
        where: {
          email: email,
          password: password,
        },
      });
      if (checkPassword) {
        res.send(checkPassword).status(200);
      } else {
        res.send("Email or password is incorrect").status(404);
      }
    } else {
      res.send("Email not found").status(404);
    }
  } catch (error) {
    res.send(`Error on login ERROR: ${error}`).status(500);
    prisma.$disconnect;
  }
});

AuthRoute.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phoneNumber, country, gender, birth } =
      req.body;
    const createUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        country: country,
        gender: gender,
        birth: birth,
      },
    });
    if (createUser) {
      res.send("User Created Successfully").status(200);
    }
  } catch (error) {
    res.send(`Error on signup ERROR: ${error}`).status(500);
    prisma.$disconnect;
  }
});

export default AuthRoute;
