import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/infra/errors/AppError";

import { CreateCarUseCase } from "./createCarUseCase";

let carsRepository: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name 1",
      description: "Description 1",
      daily_rate: 100,
      license_plate: "Driver plate 1",
      fine_amount: 200,
      brand: "Brand 1",
      category_id: "category-id-1",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create using a existing license plate!", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Name 1",
        description: "Description 1",
        daily_rate: 100,
        license_plate: "Driver plate 1",
        fine_amount: 200,
        brand: "Brand 1",
        category_id: "category-id-1",
      });

      await createCarUseCase.execute({
        name: "Name 2",
        description: "Description 2",
        daily_rate: 200,
        license_plate: "Driver plate 1",
        fine_amount: 300,
        brand: "Brand 2",
        category_id: "category-id-2",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create that has property available equal true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Name 1",
      description: "Description 1",
      daily_rate: 100,
      license_plate: "Driver plate 1",
      fine_amount: 200,
      brand: "Brand 1",
      category_id: "category-id-1",
    });

    expect(car.available).toBe(true);
  });
});
