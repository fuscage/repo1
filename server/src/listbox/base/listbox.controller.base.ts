import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ListboxService } from "../listbox.service";
import { ListboxCreateInput } from "./ListboxCreateInput";
import { ListboxWhereInput } from "./ListboxWhereInput";
import { ListboxWhereUniqueInput } from "./ListboxWhereUniqueInput";
import { ListboxFindManyArgs } from "./ListboxFindManyArgs";
import { ListboxUpdateInput } from "./ListboxUpdateInput";
import { Listbox } from "./Listbox";
import { DocumentWhereInput } from "../../document/base/DocumentWhereInput";
import { Document } from "../../document/base/Document";

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
    return await this.service.create({
      data: data,
      select: {
        code: true,
        createdAt: true,
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
  @swagger.ApiQuery({
    type: () => ListboxFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Listbox[]> {
    const args = plainToClass(ListboxFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Listbox",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        code: true,
        createdAt: true,
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
      where: params,
      select: {
        code: true,
        createdAt: true,
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
      return await this.service.update({
        where: params,
        data: data,
        select: {
          code: true,
          createdAt: true,
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
    @common.Param() params: ListboxWhereUniqueInput
  ): Promise<Listbox | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          code: true,
          createdAt: true,
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
  @common.Get("/:id/documentListbox")
  @nestAccessControl.UseRoles({
    resource: "Listbox",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => DocumentWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyDocumentListbox(
    @common.Req() request: Request,
    @common.Param() params: ListboxWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Document[]> {
    const query: DocumentWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Document",
    });
    const results = await this.service.findDocumentListbox(params.id, {
      where: query,
      select: {
        createdAt: true,
        from: true,
        id: true,
        to: true,

        type: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post("/:id/documentListbox")
  @nestAccessControl.UseRoles({
    resource: "Listbox",
    action: "update",
    possession: "any",
  })
  async createDocumentListbox(
    @common.Param() params: ListboxWhereUniqueInput,
    @common.Body() body: ListboxWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      documentListbox: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Listbox",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Listbox"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id/documentListbox")
  @nestAccessControl.UseRoles({
    resource: "Listbox",
    action: "update",
    possession: "any",
  })
  async updateDocumentListbox(
    @common.Param() params: ListboxWhereUniqueInput,
    @common.Body() body: ListboxWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      documentListbox: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Listbox",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Listbox"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id/documentListbox")
  @nestAccessControl.UseRoles({
    resource: "Listbox",
    action: "update",
    possession: "any",
  })
  async deleteDocumentListbox(
    @common.Param() params: ListboxWhereUniqueInput,
    @common.Body() body: ListboxWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      documentListbox: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Listbox",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Listbox"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
