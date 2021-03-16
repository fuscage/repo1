import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { ListboxResolverBase } from "./base/listbox.resolver.base";
import { Listbox } from "./base/Listbox";
import { ListboxService } from "./listbox.service";

@graphql.Resolver(() => Listbox)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class ListboxResolver extends ListboxResolverBase {
  constructor(
    protected readonly service: ListboxService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
