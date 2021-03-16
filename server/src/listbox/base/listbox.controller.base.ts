import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { ListboxService } from "../listbox.service";
import { ListboxCreateInput } from "./ListboxCreateInput";
import { ListboxWhereInput } from "./ListboxWhereInput";
import { ListboxWhereUniqueInput } from "./ListboxWhereUniqueInput";
import { ListboxUpdateInput } from "./ListboxUpdateInput";
import { Listbox } from "./Listbox";

export class ListboxControllerBase {
  constructor(
    protected readonly service: ListboxService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Listbox",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Listbox })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: ListboxCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Listbox> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Listbox",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Listbox"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: {
        ...data,

        documentListbox: data.documentListbox
          ? {
              connect: data.documentListbox,
            }
          : undefined,
      },
      select: {
        code: true,
        createdAt: true,

        documentListbox: {
          select: {
            id: true,
          },
        },

        id: true,
        label: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Listbox",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Listbox] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: ListboxWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Listbox[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Listbox",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        code: true,
        createdAt: true,

        documentListbox: {
          select: {
            id: true,
          },
        },

        id: true,
        label: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Listbox",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Listbox })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: ListboxWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Listbox | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Listbox",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        code: true,
        createdAt: true,

        documentListbox: {
          select: {
            id: true,
          },
        },

        id: true,
        label: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "Listbox",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Listbox })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: ListboxWhereUniqueInput,
    @common.Body()
    data: ListboxUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Listbox | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Listbox",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Listbox"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: {
          ...data,

          documentListbox: data.documentListbox
            ? {
                connect: data.documentListbox,
              }
            : undefined,
        },
        select: {
          code: true,
          createdAt: true,

          documentListbox: {
            select: {
              id: true,
            },
          },

          id: true,
          label: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "Listbox",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Listbox })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: ListboxWhereUniqueInput
  ): Promise<Listbox | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          code: true,
          createdAt: true,

          documentListbox: {
            select: {
              id: true,
            },
          },

          id: true,
          label: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
