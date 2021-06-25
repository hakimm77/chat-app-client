import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ user, path, Component }) => {
  return (
    <Route
      exact
      path={path}
      render={() => {
        return user ? <Redirect to="/chat" /> : <Component />;
      }}
    />
  );
};

export default PublicRoute;
