import express from "express";
import prisma from "../prisma";
const UsersRouter = express.Router();

UsersRouter.get("/getusers", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        Restaurant: true,
      },
    });
    res.send(users).status(200);
  } catch (error) {
    prisma.$disconnect;
    res.send(`Error on getting users ERROR: ${error}`).status(500);
  }
});

export default UsersRouter;
