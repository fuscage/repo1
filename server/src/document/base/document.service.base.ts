import { PrismaService } from "nestjs-prisma";

import {
  FindOneDocumentArgs,
  FindManyDocumentArgs,
  DocumentCreateArgs,
  DocumentUpdateArgs,
  DocumentDeleteArgs,
  Subset,
  Document,
  Listbox,
} from "@prisma/client";

export class DocumentServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyDocumentArgs>(
    args: Subset<T, FindManyDocumentArgs>
  ): Promise<Document[]> {
    return this.prisma.document.findMany(args);
  }
  async findOne<T extends FindOneDocumentArgs>(
    args: Subset<T, FindOneDocumentArgs>
  ): Promise<Document | null> {
    return this.prisma.document.findOne(args);
  }
  async create<T extends DocumentCreateArgs>(
    args: Subset<T, DocumentCreateArgs>
  ): Promise<Document> {
    return this.prisma.document.create<T>(args);
  }
  async update<T extends DocumentUpdateArgs>(
    args: Subset<T, DocumentUpdateArgs>
  ): Promise<Document> {
    return this.prisma.document.update<T>(args);
  }
  async delete<T extends DocumentDeleteArgs>(
    args: Subset<T, DocumentDeleteArgs>
  ): Promise<Document> {
    return this.prisma.document.delete(args);
  }

  async getType(parentId: string): Promise<Listbox | null> {
    return this.prisma.document
      .findOne({
        where: { id: parentId },
      })
      .type();
  }
}
