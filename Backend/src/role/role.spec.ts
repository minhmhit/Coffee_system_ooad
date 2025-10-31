import { Test, TestingModule } from "@nestjs/testing";
import { RoleService } from "./role.service";
import { PrismaService } from "../prisma/prisma.service";

const mockPrismaService = {
  role: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe("RoleService", () => {
  let service: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
  });

  it("should create a role", async () => {
    const roleData = { name: "admin", description: "Administrator" };
    const mockRole = { id: 1, ...roleData };
    mockPrismaService.role.create.mockResolvedValue(mockRole);

    const result = await service.createRole(roleData);
    expect(result.name).toBe(roleData.name);
    expect(mockPrismaService.role.create).toHaveBeenCalledWith({ data: roleData });
  });

  it("should find all roles", async () => {
    const mockRoles = [{ id: 1, name: "admin" }];
    mockPrismaService.role.findMany.mockResolvedValue(mockRoles);

    const result = await service.findAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(mockRoles);
  });
});