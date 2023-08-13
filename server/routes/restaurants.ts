import express from "express";
import prisma from "../prisma";
const RestaurantsRoute = express.Router();

RestaurantsRoute.get("/getdata", async (req, res) => {
  const data = await prisma.restaurant.findMany({
    include: {
      categories: true,
      discounts: true,
      orders: true,
      menuItems: true,
      owner: true,
    },
  });
  res.json(data);
});

RestaurantsRoute.get("/getdata/:id", async (req, res) => {
  const { id } = req.params;
  if (id.length !== 24) {
    return res.status(400).send("Invalid ID");
  }
  const data = await prisma.restaurant.findFirst({
    where: {
      id: id,
    },
    include: {
      categories: true,
      discounts: true,
      orders: true,
      menuItems: true,
      owner: true,
    },
  });
  if (!data) {
    res.status(404).send("No Data");
  } else {
    res.status(200).json(data);
  }
});

export default RestaurantsRoute;
