import { AppError } from "@shared/infra/errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category!", async () => {
    const category = {
      name: "Name test 1",
      description: "Description test 1",
    };

    await createCategoryUseCase.execute(category);

    const categoryFound = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryFound).toHaveProperty("id");
  });

  it("should not be able to create a new category with existing name!", async () => {
    expect(async () => {
      const category = {
        name: "Name test 1",
        description: "Description test 1",
      };

      await createCategoryUseCase.execute(category);

      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
