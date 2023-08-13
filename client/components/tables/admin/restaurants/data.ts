"use client";
import axios from "axios";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "IMAGE", uid: "image" },
  { name: "NAME", uid: "name", sortable: true },
  { name: "SALES", uid: "sales" },
  { name: "OWNER", uid: "owner" },
  { name: "PHONE_NUMBERS", uid: "phone_numbers" },
  { name: "ADDRESS", uid: "address" },
  { name: "DESCRIPTION", uid: "description" },
  { name: "CREATED_AT", uid: "created_at", sortable: true },
  { name: "UPDATED_AT", uid: "updated_at", sortable: true },
  { name: "DELIVERY_FEE", uid: "delivery_fee", sortable: true },
  { name: "DISCOUNTS", uid: "discounts" },
  { name: "ORDERS", uid: "orders" },
  { name: "CATEGORIES", uid: "categories" },
  { name: "EMAIL", uid: "email" },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "InActive", uid: "inactive" },
  { name: "Disabled", uid: "disabled" },
];

const fetchRestaurants = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5020/restaurants/getdata"
    );
    const fetchedRestaurants = response.data;
    console.log(response.data);
    return fetchedRestaurants;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return [];
  }
};

const restaurantsData = () => {
  return Promise.resolve(fetchRestaurants());
};

export { columns, restaurantsData, statusOptions };
