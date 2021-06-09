import React, { useEffect } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const Container = ({
  children,
  flex,
  direction,
  alignVertical,
  alignHorizantle,
  width,
  height,
  padding,
  margin,
  position,
  Style,
  mobileStyle,
  clickEvent,
  hoverOn,
  hoverOut,
  doubleClick,
}) => {
  const changeDesign = useMediaQuery("(max-width: 1000px)");

  const containerStyling = {
    position: position,
    display: flex ? "flex" : undefined,
    flexDirection: direction,
    justifyContent: alignVertical,
    alignItems: alignHorizantle,
    width: width,
    height: height,
    padding: padding, //top right bottom left
    margin: margin,
    ...Style,
  };

  const containerMobileStyling = mobileStyle;

  return (
    <div
      style={
        changeDesign
          ? containerMobileStyling
            ? containerMobileStyling
            : containerStyling
          : containerStyling
      }
      onClick={clickEvent}
      onMouseEnter={hoverOn}
      onMouseLeave={hoverOut}
      onDoubleClick={doubleClick}
    >
      {children}
    </div>
  );
};

export default Container;
//style the containers to match the mobile screen from the mobile style prop
