import { PrismaService } from "nestjs-prisma";
import { Prisma, Document, Listbox } from "@prisma/client";

export class DocumentServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.DocumentFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.DocumentFindManyArgs>
  ): Promise<number> {
    return this.prisma.document.count(args);
  }

  async findMany<T extends Prisma.DocumentFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.DocumentFindManyArgs>
  ): Promise<Document[]> {
    return this.prisma.document.findMany(args);
  }
  async findOne<T extends Prisma.DocumentFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.DocumentFindUniqueArgs>
  ): Promise<Document | null> {
    return this.prisma.document.findUnique(args);
  }
  async create<T extends Prisma.DocumentCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.DocumentCreateArgs>
  ): Promise<Document> {
    return this.prisma.document.create<T>(args);
  }
  async update<T extends Prisma.DocumentUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.DocumentUpdateArgs>
  ): Promise<Document> {
    return this.prisma.document.update<T>(args);
  }
  async delete<T extends Prisma.DocumentDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.DocumentDeleteArgs>
  ): Promise<Document> {
    return this.prisma.document.delete(args);
  }

  async getType(parentId: string): Promise<Listbox | null> {
    return this.prisma.document
      .findUnique({
        where: { id: parentId },
      })
      .type();
  }
}
