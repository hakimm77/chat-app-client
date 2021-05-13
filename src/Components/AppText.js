const AppText = ({ children, size, weight, color, Style }) => {
  return (
    <div style={{ ...Style, fontSize: size, fontWeight: weight, color: color }}>
      {children}
    </div>
  );
};
export default AppText;
