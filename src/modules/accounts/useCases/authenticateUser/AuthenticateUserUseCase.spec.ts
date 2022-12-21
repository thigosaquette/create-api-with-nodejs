import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/infra/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createCategoryUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createCategoryUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to create a token with user authentication!", async () => {
    const user: ICreateUserDTO = {
      driver_license: "driver_license 1",
      email: "email 1",
      password: "password 1",
      name: "name 1",
    };

    await createCategoryUseCase.execute(user);

    const authenticationInfo = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(authenticationInfo).toHaveProperty("token");
  });

  it("should not be able to create a token with no existing username!", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "driver_license 1",
        email: "email 1",
        password: "password 1",
        name: "name 1",
      };

      await createCategoryUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: "email 2",
        password: "password 1",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a token with no existing password!", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "driver_license 1",
        email: "email 1",
        password: "password 1",
        name: "name 1",
      };

      await createCategoryUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "password 2",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
