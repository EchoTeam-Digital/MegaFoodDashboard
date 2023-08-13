"use client"
import NavBar from "../../../../../components/layout/NavBar";
import SideBar from "../../../../../components/layout/SideBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-row bg-gray-100 dark:bg-gray-900">
      <SideBar selectedIndex={2} />
      <div className="w-full">
        <NavBar displayText="Edit Restaurant" />
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
