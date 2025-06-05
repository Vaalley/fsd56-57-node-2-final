import { Request, Response } from "express";
import { APIResponse } from "../utils/apiResponse";
import logger from "../utils/logger";
import { borrowingModel } from "../models/borrowing.model";
import { NewBorrowing } from "../entities/borrowing.entity";

const borrowingController = {
  getAll: async (request: Request, response: Response) => {
    try {
      const borrowings = await borrowingModel.getAll();
      return APIResponse(response, borrowings, "Emprunts récupérés", 200);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération des emprunts; ${err.message}`,
      );
      throw new Error("Impossible de récupérer les emprunts");
    }
  },
  get: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const borrowing = await borrowingModel.get(id);
      return APIResponse(response, borrowing, "Emprunt récupéré", 200);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération de l'emprunt; ${err.message}`,
      );
      throw new Error("Impossible de récupérer l'emprunt");
    }
  },
  create: async (request: Request, response: Response) => {
    try {
      const borrowing: NewBorrowing = request.body;
      const newBorrowing = await borrowingModel.create(borrowing);
      return APIResponse(response, newBorrowing, "Emprunt créé", 201);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la création de l'emprunt; ${err.message}`,
      );
      throw new Error("Impossible de créer l'emprunt");
    }
  },
  update: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const borrowing: NewBorrowing = request.body;
      const updatedBorrowing = await borrowingModel.update(id, borrowing);
      return APIResponse(
        response,
        updatedBorrowing,
        "Emprunt mis à jour",
        200,
      );
    } catch (err: any) {
      logger.error(
        `Erreur lors de la mise à jour de l'emprunt; ${err.message}`,
      );
      throw new Error("Impossible de mettre à jour l'emprunt");
    }
  },
  delete: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const deletedBorrowing = await borrowingModel.delete(id);
      return APIResponse(
        response,
        deletedBorrowing,
        "Emprunt supprimé",
        200,
      );
    } catch (err: any) {
      logger.error(
        `Erreur lors de la suppression de l'emprunt; ${err.message}`,
      );
      throw new Error("Impossible de supprimer l'emprunt");
    }
  },
};

export default borrowingController;
