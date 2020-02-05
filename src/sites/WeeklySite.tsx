import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import { Site } from "../App";
import FeedPage from "../pages/ArticleFeedPage";
import { WithRouterComponent } from "../types/WithRouterComponent";
import ArticlePage from "../pages/ArticlePage";
import ArticleEditPage from "../pages/ArticleEditPage";

export interface IWeeklySiteProps {
  setSite: (site: Site) => void;
}

const WeeklySite: React.FC<WithRouterComponent<{}, IWeeklySiteProps>> = ({
  setSite,
  match
}) => {
  setSite("weekly");

  return (
    <Switch>
      <Route exact={true} path={`${match.path}`} component={FeedPage} />
      <Route
        exact
        path={`${match.path}/articles/:alias`}
        component={ArticlePage}
      />
      <Route exact path={`${match.path}/edit`} component={ArticleEditPage} />
    </Switch>
  );
};

const routes = [
  { to: "/articles/:alias", component: ArticlePage },
  { to: "/edit", component: ArticleEditPage }
];

export default WeeklySite;
