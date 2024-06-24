import { NavBar } from "../navigation-menu/NavBar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="lg:p-5 p-2">
      <NavBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};
