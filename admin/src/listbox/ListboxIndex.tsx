import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ListboxList } from "./ListboxList";
import { CreateListbox } from "./CreateListbox";
import { Listbox } from "./Listbox";

export const ListboxIndex = (): React.ReactElement => {
  useBreadcrumbs("/listboxes/", "Listboxes");

  return (
    <Switch>
      <PrivateRoute exact path={"/listboxes/"} component={ListboxList} />
      <PrivateRoute path={"/listboxes/new"} component={CreateListbox} />
      <PrivateRoute path={"/listboxes/:id"} component={Listbox} />
    </Switch>
  );
};
