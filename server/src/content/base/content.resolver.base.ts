import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateContentArgs } from "./CreateContentArgs";
import { UpdateContentArgs } from "./UpdateContentArgs";
import { DeleteContentArgs } from "./DeleteContentArgs";
import { FindManyContentArgs } from "./FindManyContentArgs";
import { FindOneContentArgs } from "./FindOneContentArgs";
import { Content } from "./Content";
import { ContentService } from "../content.service";

@graphql.Resolver(() => Content)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class ContentResolverBase {
  constructor(
    protected readonly service: ContentService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Content])
  @nestAccessControl.UseRoles({
    resource: "Content",
    action: "read",
    possession: "any",
  })
  async contents(
    @graphql.Args() args: FindManyContentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Content[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Content",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Content, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Content",
    action: "read",
    possession: "own",
  })
  async content(
    @graphql.Args() args: FindOneContentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Content | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Content",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Content)
  @nestAccessControl.UseRoles({
    resource: "Content",
    action: "create",
    possession: "any",
  })
  async createContent(
    @graphql.Args() args: CreateContentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Content> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Content",
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
        `providing the properties: ${properties} on ${"Content"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Content)
  @nestAccessControl.UseRoles({
    resource: "Content",
    action: "update",
    possession: "any",
  })
  async updateContent(
    @graphql.Args() args: UpdateContentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Content | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Content",
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
        `providing the properties: ${properties} on ${"Content"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
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

  @graphql.Mutation(() => Content)
  @nestAccessControl.UseRoles({
    resource: "Content",
    action: "delete",
    possession: "any",
  })
  async deleteContent(
    @graphql.Args() args: DeleteContentArgs
  ): Promise<Content | null> {
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
}
