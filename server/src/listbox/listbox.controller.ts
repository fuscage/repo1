import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ListboxService } from "./listbox.service";
import { ListboxControllerBase } from "./base/listbox.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("listboxes")
@common.Controller("listboxes")
export class ListboxController extends ListboxControllerBase {
  constructor(
    protected readonly service: ListboxService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
