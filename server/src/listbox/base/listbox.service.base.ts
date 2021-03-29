import { PrismaService } from "nestjs-prisma";

import {
  FindOneListboxArgs,
  FindManyListboxArgs,
  ListboxCreateArgs,
  ListboxUpdateArgs,
  ListboxDeleteArgs,
  Subset,
  Listbox,
  FindManyDocumentArgs,
  Document,
} from "@prisma/client";

export class ListboxServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyListboxArgs>(
    args: Subset<T, FindManyListboxArgs>
  ): Promise<Listbox[]> {
    return this.prisma.listbox.findMany(args);
  }
  async findOne<T extends FindOneListboxArgs>(
    args: Subset<T, FindOneListboxArgs>
  ): Promise<Listbox | null> {
    return this.prisma.listbox.findOne(args);
  }
  async create<T extends ListboxCreateArgs>(
    args: Subset<T, ListboxCreateArgs>
  ): Promise<Listbox> {
    return this.prisma.listbox.create<T>(args);
  }
  async update<T extends ListboxUpdateArgs>(
    args: Subset<T, ListboxUpdateArgs>
  ): Promise<Listbox> {
    return this.prisma.listbox.update<T>(args);
  }
  async delete<T extends ListboxDeleteArgs>(
    args: Subset<T, ListboxDeleteArgs>
  ): Promise<Listbox> {
    return this.prisma.listbox.delete(args);
  }

  async findDocumentListbox(
    parentId: string,
    args: FindManyDocumentArgs
  ): Promise<Document[]> {
    return this.prisma.listbox
      .findOne({
        where: { id: parentId },
      })
      .documentListbox(args);
  }
}
