import { Route, Redirect } from "react-router-dom";
import Chat from "../Screens/Chat";

const PrivateRoute = ({ user, path, Component }) => {
  return (
    <Route
      exact
      path={path}
      render={() => {
        return user ? <Component /> : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
