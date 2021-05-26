const Icon = ({ width, height, padding, source, clickEvent, Style }) => {
  const imageStyle = {
    width: width,
    height: height,
    padding: padding,
    cursor: "pointer",
    ...Style,
  };

  return <img style={imageStyle} src={source} onClick={clickEvent} />;
};

export default Icon;
