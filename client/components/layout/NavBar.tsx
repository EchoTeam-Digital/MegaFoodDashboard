"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  User,
  Switch,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { MoonIcon } from "../icons/MoonIcon";
import { SunIcon } from "../icons/SunIcon";
import { useTheme } from "next-themes";

interface NavBarProps {
  displayText?: string;
}

const NavBar = ({ displayText }: NavBarProps) => {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (theme) {
      setIsDark(theme === "dark");
    }
  }, [theme]);

  return (
    <nav className="border-gray-200 dark:bg-gray-900 dark:text-white">
      <div className="max-w-screen-xl rounded-3xl flex flex-wrap items-center justify-start mx-auto p-4 bg-white dark:bg-gray-800">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          {displayText}
        </span>
        <div
          className="flex justify-between ml-10 dark:text-white"
          style={{ width: "75%" }}
        >
          <Input
            placeholder="Search"
            size="md"
            color="warning"
            variant="bordered"
            className="w-80"
            startContent={<i className="bx bx-search-alt-2"></i>}
          />
          <div className="flex items-center justify-center">
            <Switch
              isSelected={isDark}
              onValueChange={() => {
                setIsDark(!isDark);
                setTheme(theme === 'light' ? "dark" : "light");
              }}
              size="lg"
              color="warning"
              className="mr-5"
              startContent={<SunIcon />}
              endContent={<MoonIcon />}
            ></Switch>

            <Dropdown>
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    src: "https://i.pravatar.cc/150?img=12",
                  }}
                  className="transition-transform"
                  description="ADMIN"
                  name="عبدالرحمن محمود"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">zoey@example.com</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
