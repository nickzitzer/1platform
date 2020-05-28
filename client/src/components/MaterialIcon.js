import * as i from "@material-ui/icons";
import React from "react";

const MaterialIcon = ({ icon }) => {

  // somehow resolve this icon
  let resolvedIcon = i[icon];

  return React.createElement(resolvedIcon)
}

export default MaterialIcon;
