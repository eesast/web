import React from "react";
import { Route, Switch } from "react-router";
import { Site } from "../App";
import FeedPage from "../pages/FeedPage";
import { WithRouterPage } from "../types/WithRouterPage";

export interface IWeeklySiteProps {
  setSite: (site: Site) => void;
}

const WeeklySite: React.FC<WithRouterPage<{}, IWeeklySiteProps>> = ({
  setSite,
  match
}) => {
  setSite("weekly");

  return (
    <Switch>
      <Route exact={true} path={`${match.path}`} component={FeedPage} />
    </Switch>
  );
};

export default WeeklySite;
