import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/infra/errors/AppError";

import { CreateCarSpecificationUseCase } from "./createCarSpecificationUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name 1",
      description: "Description 1",
      daily_rate: 100,
      license_plate: "Driver plate 1",
      fine_amount: 200,
      brand: "Brand 1",
      category_id: "category-id-1",
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: "specification name 1",
      description: "specification description description",
    });

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });

    expect(specificationsCars.specifications[0]).toMatchObject(specification);
  });

  it("should not be able to add a new specification to non-existent car", async () => {
    expect(async () => {
      const car_id = "car_id_test";
      const specifications_id = ["specification_id_test"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
