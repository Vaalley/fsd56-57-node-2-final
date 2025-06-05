import { Request, Response } from "express";
import { APIResponse } from "../utils/apiResponse";
import logger from "../utils/logger";
import { categoryModel } from "../models/category.model";
import { NewCategory } from "../entities/category.entity";

const categoryController = {
  getAll: async (request: Request, response: Response) => {
    try {
      const categories = await categoryModel.getAll();
      return APIResponse(
        response,
        categories,
        "Categories récupérées",
        200,
      );
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération des catégories; ${err.message}`,
      );
      throw new Error("Impossible de récupérer les catégories");
    }
  },
  get: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const category = await categoryModel.get(id);
      return APIResponse(response, category, "Catégorie récupérée", 200);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération de la catégorie; ${err.message}`,
      );
      throw new Error("Impossible de récupérer la catégorie");
    }
  },
  create: async (request: Request, response: Response) => {
    try {
      const category: NewCategory = request.body;
      const newCategory = await categoryModel.create(category);
      return APIResponse(response, newCategory, "Catégorie créée", 201);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la création de la catégorie; ${err.message}`,
      );
      throw new Error("Impossible de créer la catégorie");
    }
  },
  update: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const category: NewCategory = request.body;
      const updatedCategory = await categoryModel.update(id, category);
      return APIResponse(
        response,
        updatedCategory,
        "Catégorie mise à jour",
        200,
      );
    } catch (err: any) {
      logger.error(
        `Erreur lors de la mise à jour de la catégorie; ${err.message}`,
      );
      throw new Error("Impossible de mettre à jour la catégorie");
    }
  },
  delete: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const deletedCategory = await categoryModel.delete(id);
      return APIResponse(
        response,
        deletedCategory,
        "Catégorie supprimée",
        200,
      );
    } catch (err: any) {
      logger.error(
        `Erreur lors de la suppression de la catégorie; ${err.message}`,
      );
      throw new Error("Impossible de supprimer la catégorie");
    }
  },
};

export default categoryController;
