import { NavBar } from "./NavBar";
import { Outlet } from 'react-router-dom'

var rootElement = document.getElementById("root")!;
var imagePaths = rootElement.dataset && rootElement.dataset.images && JSON.parse(rootElement.dataset.images);
console.log(imagePaths)

export const Layout = () => {
  
  return (
    <div className="p-5">
      <NavBar />
      <div><Outlet /></div>
    </div>
  );
};
