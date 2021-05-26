import useMediaQuery from "@material-ui/core/useMediaQuery";

const AppText = ({ children, size, weight, color, Style, mobileStyle }) => {
  const changeDesign = useMediaQuery("(max-width: 1000px)");

  const textMobile = mobileStyle;

  const textStyle = {
    fontSize: size,
    fontWeight: weight,
    color: color,
    ...Style,
  };
  return (
    <div
      style={changeDesign ? (textMobile ? textMobile : textStyle) : textStyle}
    >
      {children}
    </div>
  );
};
export default AppText;
