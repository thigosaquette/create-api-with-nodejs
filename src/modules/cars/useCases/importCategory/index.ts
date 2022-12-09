import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

export function importCategoryController() {
  const categoriesRepository = new CategoriesRepository();

  const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);

  const importCategoryController = new ImportCategoryController(
    importCategoryUseCase
  );

  return importCategoryController;
}
