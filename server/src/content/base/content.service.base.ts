import { PrismaService } from "nestjs-prisma";

import {
  FindOneContentArgs,
  FindManyContentArgs,
  ContentCreateArgs,
  ContentUpdateArgs,
  ContentDeleteArgs,
  Subset,
  Content,
} from "@prisma/client";

export class ContentServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyContentArgs>(
    args: Subset<T, FindManyContentArgs>
  ): Promise<Content[]> {
    return this.prisma.content.findMany(args);
  }
  async findOne<T extends FindOneContentArgs>(
    args: Subset<T, FindOneContentArgs>
  ): Promise<Content | null> {
    return this.prisma.content.findOne(args);
  }
  async create<T extends ContentCreateArgs>(
    args: Subset<T, ContentCreateArgs>
  ): Promise<Content> {
    return this.prisma.content.create<T>(args);
  }
  async update<T extends ContentUpdateArgs>(
    args: Subset<T, ContentUpdateArgs>
  ): Promise<Content> {
    return this.prisma.content.update<T>(args);
  }
  async delete<T extends ContentDeleteArgs>(
    args: Subset<T, ContentDeleteArgs>
  ): Promise<Content> {
    return this.prisma.content.delete(args);
  }
}
