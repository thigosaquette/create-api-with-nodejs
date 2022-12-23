import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./listAvailableCarsUsecase";

let carRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carRepositoryInMemory
    );
  });

  it("should be ble to list all available cars", async () => {
    const car = await carRepositoryInMemory.create({
      name: "Name 1",
      description: "Description 1",
      daily_rate: 100,
      license_plate: "Driver plate 1",
      fine_amount: 200,
      brand: "Brand 1",
      category_id: "category-id-1",
    });

    const allCars = await listAvailableCarsUseCase.execute({});

    expect(allCars).toEqual([car]);
  });

  it("should be ble to list all available cars by name", async () => {
    const car = await carRepositoryInMemory.create({
      name: "Name test 1",
      description: "Description 1",
      daily_rate: 100,
      license_plate: "Driver plate 1",
      fine_amount: 200,
      brand: "Brand 1",
      category_id: "category-id-1",
    });

    await carRepositoryInMemory.create({
      name: "Name test 2",
      description: "Description 1",
      daily_rate: 100,
      license_plate: "Driver plate 1",
      fine_amount: 200,
      brand: "Brand 1",
      category_id: "category-id-1",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: car.name,
    });

    expect(cars).toEqual([car]);
  });

  it("should be ble to list all available cars by brand", async () => {
    const car = await carRepositoryInMemory.create({
      name: "Name 1",
      description: "Description 1",
      daily_rate: 100,
      license_plate: "Driver plate 1",
      fine_amount: 200,
      brand: "Brand test 1",
      category_id: "category-id-1",
    });

    await carRepositoryInMemory.create({
      name: "Name 2",
      description: "Description 2",
      daily_rate: 100,
      license_plate: "Driver plate 2",
      fine_amount: 200,
      brand: "Brand 2",
      category_id: "category-id-1",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: car.brand,
    });

    expect(cars).toEqual([car]);
  });

  it("should be ble to list all available cars by category", async () => {
    const car = await carRepositoryInMemory.create({
      name: "Name 1",
      description: "Description 1",
      daily_rate: 100,
      license_plate: "Driver plate 1",
      fine_amount: 200,
      brand: "Brand 1",
      category_id: "category-test-id-1",
    });

    await carRepositoryInMemory.create({
      name: "Name 2",
      description: "Description 1",
      daily_rate: 100,
      license_plate: "Driver plate 1",
      fine_amount: 200,
      brand: "Brand 1",
      category_id: "category-test-id-2",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: car.category_id,
    });

    expect(cars).toEqual([car]);
  });
});
