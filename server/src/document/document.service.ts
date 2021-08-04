import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DocumentServiceBase } from "./base/document.service.base";

@Injectable()
export class DocumentService extends DocumentServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
