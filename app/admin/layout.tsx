import React, { ReactNode } from "react";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";

interface LayoutProps {
    children: ReactNode;
}

const CustomLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
      <div>
        <SideNav />
        <TopNav />
        <main className="absolute w-full md:w-5/6 top-14 right-0 z-8">
            {children}
        </main>
      </div>
    );
  };
  
  export default CustomLayout;