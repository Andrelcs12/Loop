import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from "@nestjs/common";
import type { User as SupabaseUser } from "@supabase/supabase-js";

import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { SupabaseAuthGuard } from "../../common/guards/supabase-auth.guard";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TasksService } from "./tasks.service";

@Controller("tasks")
@UseGuards(SupabaseAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@CurrentUser() authUser: SupabaseUser, @Body() dto: CreateTaskDto) {
    return this.tasksService.createTask(authUser, dto);
  }

  @Get()
  list(@CurrentUser() authUser: SupabaseUser) {
    return this.tasksService.getTasks(authUser);
  }

  @Get(":id")
  getOne(@CurrentUser() authUser: SupabaseUser, @Param("id", new ParseUUIDPipe()) id: string) {
    return this.tasksService.getTask(authUser, id);
  }

  @Patch(":id")
  update(@CurrentUser() authUser: SupabaseUser, @Param("id", new ParseUUIDPipe()) id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.updateTask(authUser, id, dto);
  }

  @Patch(":id/archive")
  archive(@CurrentUser() authUser: SupabaseUser, @Param("id", new ParseUUIDPipe()) id: string) {
    return this.tasksService.archiveTask(authUser, id);
  }
}
