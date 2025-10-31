import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async createRole(data: { name: string; description?: string }) {
    return this.prisma.role.create({ data });
  }

  async findAll() {
    return this.prisma.role.findMany();
  }

  async findOne(id: number) {
    return this.prisma.role.findUnique({ where: { id } });
  }

  async updateRole(id: number, data: { name?: string; description?: string }) {
    return this.prisma.role.update({ where: { id }, data });
  }

  async deleteRole(id: number) {
    return this.prisma.role.delete({ where: { id } });
  }
}
