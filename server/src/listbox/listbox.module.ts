import { Module } from "@nestjs/common";
import { ListboxModuleBase } from "./base/listbox.module.base";
import { ListboxService } from "./listbox.service";
import { ListboxController } from "./listbox.controller";
import { ListboxResolver } from "./listbox.resolver";

@Module({
  imports: [ListboxModuleBase],
  controllers: [ListboxController],
  providers: [ListboxService, ListboxResolver],
  exports: [ListboxService],
})
export class ListboxModule {}
