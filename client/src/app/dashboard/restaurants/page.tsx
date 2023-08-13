"use client";

import React from "react";
import SideBar from "../../../../components/layout/SideBar";
import NavBar from "../../../../components/layout/NavBar";
import AdminRestaurantsTable from "../../../../components/tables/admin/restaurants/restaurantTable";

const Restaurants = () => {
  return (
    <>
      <div className="min-h-screen flex flex-row bg-gray-100 dark:bg-gray-900">
        <SideBar selectedIndex={2} />
        <div className="w-full">
          <NavBar displayText="Restaurants" />
          <div className="mr-20 ml-20 mt-7 rounded-lg bg-white dark:bg-gray-800 p-7 ">
            <AdminRestaurantsTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Restaurants;
