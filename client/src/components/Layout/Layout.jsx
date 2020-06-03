import React, { Fragment } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const layout = (props) => {
  return (
    <Fragment>
      {<Navbar />}
      <main>{props.children}</main>
      {<Footer />}
    </Fragment>
  );
};
export default layout;
