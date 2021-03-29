import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ContentList } from "./ContentList";
import { CreateContent } from "./CreateContent";
import { Content } from "./Content";

export const ContentIndex = (): React.ReactElement => {
  useBreadcrumbs("/contents/", "Contents");

  return (
    <Switch>
      <PrivateRoute exact path={"/contents/"} component={ContentList} />
      <PrivateRoute path={"/contents/new"} component={CreateContent} />
      <PrivateRoute path={"/contents/:id"} component={Content} />
    </Switch>
  );
};
