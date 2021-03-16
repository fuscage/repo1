import { PrismaService } from "nestjs-prisma";
import {
  FindOneListboxArgs,
  FindManyListboxArgs,
  ListboxCreateArgs,
  ListboxUpdateArgs,
  ListboxDeleteArgs,
  Subset,
} from "@prisma/client";

export class ListboxServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyListboxArgs>(
    args: Subset<T, FindManyListboxArgs>
  ) {
    return this.prisma.listbox.findMany(args);
  }
  findOne<T extends FindOneListboxArgs>(args: Subset<T, FindOneListboxArgs>) {
    return this.prisma.listbox.findOne(args);
  }
  create<T extends ListboxCreateArgs>(args: Subset<T, ListboxCreateArgs>) {
    return this.prisma.listbox.create<T>(args);
  }
  update<T extends ListboxUpdateArgs>(args: Subset<T, ListboxUpdateArgs>) {
    return this.prisma.listbox.update<T>(args);
  }
  delete<T extends ListboxDeleteArgs>(args: Subset<T, ListboxDeleteArgs>) {
    return this.prisma.listbox.delete(args);
  }
}
