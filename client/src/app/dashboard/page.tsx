"use client";

import React from "react";
import SideBar from "../../../components/layout/SideBar";
import NavBar from "../../../components/layout/NavBar";
import CustomersAndSalesChart from "../../../components/charts/customersAndSalesChart";
import TopCards from "../../../components/layout/dashboard/topCards";
import TopRestaurants from "../../../components/layout/dashboard/topRestaurants";

const Dashboard = () => {
  return (
    <>
      <div className="min-h-screen flex flex-row bg-gray-100 dark:bg-gray-900">
        <SideBar selectedIndex={1} />
        <div className="w-full">
          <NavBar displayText="Dashboard" />
          <div className="mr-20 ml-20 mt-7">
            <div className="mb-5">
              <TopCards />
            </div>
            <div className="mb-5">
              <div className="xl:grid xl:grid-cols-3 gap-10">
                <div className="xl:col-span-2 rounded-2xl bg-white dark:bg-gray-800 p-5">
                  <CustomersAndSalesChart />
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl">
                  <TopRestaurants />
                </div>
              </div>
            </div>
            <div className="">
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
