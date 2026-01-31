import Nabar from "./Nabar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <>
      <Nabar />
      <Outlet />
       <Footer />
    </>
  );
}
