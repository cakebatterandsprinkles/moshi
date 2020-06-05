import React, { Fragment } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import UserNavbar from "../UserNavbar/UserNavbar";

const layout = (props) => {
  
  const selectNavbarComponent = () => {
    return (props.isAuthenticated ? <UserNavbar/> : <Navbar />)
  }

  return (
    <Fragment>
      {selectNavbarComponent()}
      <main>{props.children}</main>
      {<Footer />}
    </Fragment>
  );
};
export default layout;
