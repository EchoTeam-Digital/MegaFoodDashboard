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

RestaurantsRoute.post("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      address,
      phoneNumbers,
      email,
      ownerId,
      deliveryFee,
      image,
      status,
    } = req.body;
    if (id.length !== 24) {
      return res.status(400).send("Invalid ID");
    }
    const data = await prisma.restaurant.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        description: description,
        address: address,
        phoneNumbers: phoneNumbers,
        ownerId: ownerId,
        deliveryFee: deliveryFee,
        image: image,
        status: status,
        updatedAt: new Date(),
      },
    });
    if (!data) {
      return res.status(404).send("resturant not found");
    }
    res.status(200).send(`Restaurant ${data.name} has been updated`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

RestaurantsRoute.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id.length !== 24) {
      return res.status(400).send("Invalid ID");
    }
    const data = await prisma.restaurant.delete({
      where: {
        id: id,
      },
    });
    if (!data) {
      return res.status(404).send("resturant not found");
    }
    res.status(200).send(`Restaurant ${data.name} has been deleted`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

export default RestaurantsRoute;
