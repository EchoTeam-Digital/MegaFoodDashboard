"use client";
import React from "react";
import AnimatedLogo from "../animation/AnimatedLogo";
import Link from "next/link";

interface Props {
  selectedIndex: number;
}

const SideBar = ({ selectedIndex }: Props) => {
  return (
    <>
      <div className="min-h-screen flex flex-row bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col w-56 bg-white dark:bg-gray-800 rounded-r-3xl overflow-hidden">
          <div className="flex items-center justify-center h-20 shadow-sm">
            <h1 className="text-2xl uppercase text-warning">
              <AnimatedLogo />
            </h1>
          </div>
          <ul className="flex flex-col py-4">
            <div className="flex items-center justify-center">
              <hr className="w-full" />
              <span className="text-gray-400 ml-2 mr-2">الرئيسيه</span>
              <hr className="w-full" />
            </div>
            <li>
              <Link
                href="/dashboard"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i className="bx bx-home"></i>
                </span>
                <span
                  className={
                    selectedIndex == 1
                      ? "text-sm font-bold text-black dark:text-white"
                      : "text-sm font-medium text-gray-500 dark:text-gray-300"
                  }
                >
                  لوحة التحكم
                </span>
                {selectedIndex == 1 && (
                  <span className="ml-auto mr-6 text-sm  rounded-full px-3 py-px text-warning">
                    <i className="bx bxs-right-arrow"></i>
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/restaurants"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i className="bx bx-restaurant"></i>
                </span>
                <span
                  className={
                    selectedIndex == 2
                      ? "text-sm font-bold text-black dark:text-white"
                      : "text-sm font-medium text-gray-500 dark:text-gray-300"
                  }
                >
                  المطاعم
                </span>
                {selectedIndex == 2 && (
                  <span className="ml-auto mr-6 text-sm  rounded-full px-3 py-px text-warning">
                    <i className="bx bxs-right-arrow"></i>
                  </span>
                )}
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i className="bx bx-bell"></i>
                </span>
                <span
                  className={
                    selectedIndex == 3
                      ? "text-sm font-bold text-black dark:text-white"
                      : "text-sm font-medium text-gray-500 dark:text-gray-300"
                  }
                >
                  الإشعارات
                </span>
                <span className="ml-auto mr-6 text-sm bg-success-100 rounded-full px-3 py-px text-success-500">
                  5
                </span>
                {selectedIndex == 3 && (
                  <span className="ml-auto mr-6 text-sm  rounded-full px-3 py-px text-warning">
                    <i className="bx bxs-right-arrow"></i>
                  </span>
                )}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i className="bx bx-shopping-bag"></i>
                </span>
                <span
                  className={
                    selectedIndex == 4
                      ? "text-sm font-bold text-black dark:text-white"
                      : "text-sm font-medium text-gray-500 dark:text-gray-300"
                  }
                >
                  Dashboard
                </span>
                {selectedIndex == 4 && (
                  <span className="ml-auto mr-6 text-sm  rounded-full px-3 py-px text-warning">
                    <i className="bx bxs-right-arrow"></i>
                  </span>
                )}
              </a>
            </li>
            <div className="flex items-center justify-center">
              <hr className="w-full" />
              <span className="text-gray-400 ml-2 mr-2">العملاء</span>
              <hr className="w-full" />
            </div>
            <li>
              <a
                href="#"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i className="bx bx-chat"></i>
                </span>
                <span
                  className={
                    selectedIndex == 5
                      ? "text-sm font-bold text-black dark:text-white"
                      : "text-sm font-medium text-gray-500 dark:text-gray-300"
                  }
                >
                  Dashboard
                </span>
                {selectedIndex == 5 && (
                  <span className="ml-auto mr-6 text-sm  rounded-full px-3 py-px text-warning">
                    <i className="bx bxs-right-arrow"></i>
                  </span>
                )}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i className="bx bx-user"></i>
                </span>
                <span
                  className={
                    selectedIndex == 6
                      ? "text-sm font-bold text-black dark:text-white"
                      : "text-sm font-medium text-gray-500 dark:text-gray-300"
                  }
                >
                  Dashboard
                </span>
                {selectedIndex == 6 && (
                  <span className="ml-auto mr-6 text-sm  rounded-full px-3 py-px text-warning">
                    <i className="bx bxs-right-arrow"></i>
                  </span>
                )}
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-danger dark:hover:text-danger"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i className="bx bx-log-out"></i>
                </span>
                <span className="text-sm font-medium">Logout</span>
              </a>
            </li>
          </ul>
          <div className="flex flex-col items-center justify-center h-12 mt-auto">
            <span className="text-gray-400 dark:text-gray-500 text-sm">
              Version: 0.0.2
            </span>
            <span className="text-gray-400 dark:text-gray-500 text-sm">
              By, Echo Team
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
