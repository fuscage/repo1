import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ListboxServiceBase } from "./base/listbox.service.base";

@Injectable()
export class ListboxService extends ListboxServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
