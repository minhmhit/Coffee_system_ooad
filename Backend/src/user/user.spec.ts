import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { PrismaService } from "../prisma/prisma.service";

const mockPrismaService = {
  user: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
};

describe("UserService", () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it("should create a user", async () => {
    const userData = {
      email: "test@example.com",
      password: "password",
      roleId: 1,
    };
    const mockUser = { id: 1, ...userData, password: "hashed", isActive: true, createdAt: new Date() };
    mockPrismaService.user.create.mockResolvedValue(mockUser);

    const result = await service.createUser(userData);
    expect(result.email).toBe(userData.email);
    expect(mockPrismaService.user.create).toHaveBeenCalledWith({
      data: {
        ...userData,
        password: expect.any(String), // hashed password
      },
    });
  });

  it("should find all users", async () => {
    const mockUsers = [{ id: 1, email: "test@example.com" }];
    mockPrismaService.user.findMany.mockResolvedValue(mockUsers);

    const result = await service.findAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(mockUsers);
  });
});
