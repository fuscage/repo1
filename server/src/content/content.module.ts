import { Module } from "@nestjs/common";
import { ContentModuleBase } from "./base/content.module.base";
import { ContentService } from "./content.service";
import { ContentController } from "./content.controller";
import { ContentResolver } from "./content.resolver";

@Module({
  imports: [ContentModuleBase],
  controllers: [ContentController],
  providers: [ContentService, ContentResolver],
  exports: [ContentService],
})
export class ContentModule {}
