import { Injectable, NotFoundException } from "@nestjs/common";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { TaskStatus } from "@prisma/client";

import { AuthService } from "../auth/auth.service";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

const taskSelect = {
  id: true,
  title: true,
  estimatedMinutes: true,
  priority: true,
  deadline: true,
  status: true,
  createdAt: true,
  updatedAt: true,
} as const;

@Injectable()
export class TasksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async createTask(authUser: SupabaseUser, dto: CreateTaskDto) {
    const user = await this.authService.resolveUser(authUser);
    return this.prisma.task.create({
      data: {
        userId: user.id,
        title: dto.title,
        estimatedMinutes: dto.estimatedMinutes,
        priority: dto.priority,
        deadline: dto.deadline ? new Date(dto.deadline) : undefined,
        status: TaskStatus.PENDING,
      },
      select: taskSelect,
    });
  }

  async getTasks(authUser: SupabaseUser) {
    const user = await this.authService.resolveUser(authUser);
    return this.prisma.task.findMany({
      where: { userId: user.id, status: { not: TaskStatus.ARCHIVED } },
      orderBy: { createdAt: "desc" },
      select: taskSelect,
    });
  }

  async getTask(authUser: SupabaseUser, taskId: string) {
    const user = await this.authService.resolveUser(authUser);
    return this.findOwnedTask(taskId, user.id);
  }

  async updateTask(authUser: SupabaseUser, taskId: string, dto: UpdateTaskDto) {
    const user = await this.authService.resolveUser(authUser);
    await this.findOwnedTask(taskId, user.id);
    return this.prisma.task.update({
      where: { id: taskId },
      data: {
        title: dto.title,
        estimatedMinutes: dto.estimatedMinutes,
        priority: dto.priority,
        deadline: dto.deadline ? new Date(dto.deadline) : undefined,
      },
      select: taskSelect,
    });
  }

  async archiveTask(authUser: SupabaseUser, taskId: string) {
    const user = await this.authService.resolveUser(authUser);
    await this.findOwnedTask(taskId, user.id);
    return this.prisma.task.update({
      where: { id: taskId },
      data: { status: TaskStatus.ARCHIVED },
      select: taskSelect,
    });
  }

  private async findOwnedTask(taskId: string, userId: string) {
    const task = await this.prisma.task.findFirst({
      where: { id: taskId, userId },
      select: taskSelect,
    });
    if (!task) throw new NotFoundException("Tarefa não encontrada.");
    return task;
  }
}
