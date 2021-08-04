import { PrismaService } from "nestjs-prisma";
import { Prisma, Listbox, Document } from "@prisma/client";

export class ListboxServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.ListboxFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ListboxFindManyArgs>
  ): Promise<number> {
    return this.prisma.listbox.count(args);
  }

  async findMany<T extends Prisma.ListboxFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ListboxFindManyArgs>
  ): Promise<Listbox[]> {
    return this.prisma.listbox.findMany(args);
  }
  async findOne<T extends Prisma.ListboxFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ListboxFindUniqueArgs>
  ): Promise<Listbox | null> {
    return this.prisma.listbox.findUnique(args);
  }
  async create<T extends Prisma.ListboxCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ListboxCreateArgs>
  ): Promise<Listbox> {
    return this.prisma.listbox.create<T>(args);
  }
  async update<T extends Prisma.ListboxUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ListboxUpdateArgs>
  ): Promise<Listbox> {
    return this.prisma.listbox.update<T>(args);
  }
  async delete<T extends Prisma.ListboxDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ListboxDeleteArgs>
  ): Promise<Listbox> {
    return this.prisma.listbox.delete(args);
  }

  async findDocumentListbox(
    parentId: string,
    args: Prisma.DocumentFindManyArgs
  ): Promise<Document[]> {
    return this.prisma.listbox
      .findUnique({
        where: { id: parentId },
      })
      .documentListbox(args);
  }
}
