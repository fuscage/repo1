import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateListboxArgs } from "./CreateListboxArgs";
import { UpdateListboxArgs } from "./UpdateListboxArgs";
import { DeleteListboxArgs } from "./DeleteListboxArgs";
import { FindManyListboxArgs } from "./FindManyListboxArgs";
import { FindOneListboxArgs } from "./FindOneListboxArgs";
import { Listbox } from "./Listbox";
import { Document } from "../../document/base/Document";
import { ListboxService } from "../listbox.service";

@graphql.Resolver(() => Listbox)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class ListboxResolverBase {
  constructor(
    protected readonly service: ListboxService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Listbox])
  @nestAccessControl.UseRoles({
    resource: "Listbox",
    action: "read",
    possession: "any",
  })
  async listboxes(
    @graphql.Args() args: FindManyListboxArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Listbox[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Listbox",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Listbox, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Listbox",
    action: "read",
    possession: "own",
  })
  async listbox(
    @graphql.Args() args: FindOneListboxArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Listbox | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Listbox",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Listbox)
  @nestAccessControl.UseRoles({
    resource: "Listbox",
    action: "create",
    possession: "any",
  })
  async createListbox(
    @graphql.Args() args: CreateListboxArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Listbox> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Listbox",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Listbox"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        documentListbox: args.data.documentListbox
          ? {
              connect: args.data.documentListbox,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Listbox)
  @nestAccessControl.UseRoles({
    resource: "Listbox",
    action: "update",
    possession: "any",
  })
  async updateListbox(
    @graphql.Args() args: UpdateListboxArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Listbox | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Listbox",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Listbox"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          documentListbox: args.data.documentListbox
            ? {
                connect: args.data.documentListbox,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Listbox)
  @nestAccessControl.UseRoles({
    resource: "Listbox",
    action: "delete",
    possession: "any",
  })
  async deleteListbox(
    @graphql.Args() args: DeleteListboxArgs
  ): Promise<Listbox | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => Document, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Listbox",
    action: "read",
    possession: "any",
  })
  async documentListbox(
    @graphql.Parent() parent: Listbox,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Document | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Document",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .documentListbox();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
