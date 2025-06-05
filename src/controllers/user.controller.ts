import { NewUser } from "../entities/user.entity";
import { userModel } from "../models/user.model";
import logger from "../utils/logger";
import { APIResponse } from "../utils/apiResponse";
import { Request, Response } from "express";

const userController = {
  getAll: async (request: Request, response: Response) => {
    try {
      const users = await userModel.getAll();
      return APIResponse(response, users, "Utilisateurs récupérés", 200);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération des utilisateurs; ${err.message}`,
      );
      throw new Error("Impossible de récupérer les utilisateurs");
    }
  },
  get: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const user = await userModel.get(id);
      return APIResponse(response, user, "Utilisateur récupéré", 200);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération de l'utilisateur; ${err.message}`,
      );
      throw new Error("Impossible de récupérer l'utilisateur");
    }
  },
  create: async (request: Request, response: Response) => {
    try {
      const user: NewUser = request.body;
      const newUser = await userModel.create(user);
      return APIResponse(response, newUser, "Utilisateur créé", 201);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la création de l'utilisateur; ${err.message}`,
      );
      throw new Error("Impossible de créer l'utilisateur");
    }
  },
  update: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { email, username, password } = request.body;
      const updatedUser = await userModel.update(id, {
        email,
        username,
        password,
      });
      return APIResponse(
        response,
        updatedUser,
        "Utilisateur mis à jour",
        200,
      );
    } catch (err: any) {
      logger.error(
        `Erreur lors de la mise à jour de l'utilisateur; ${err.message}`,
      );
      throw new Error("Impossible de mettre à jour l'utilisateur");
    }
  },
  delete: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const deletedUser = await userModel.delete(id);
      return APIResponse(
        response,
        deletedUser,
        "Utilisateur supprimé",
        200,
      );
    } catch (err: any) {
      logger.error(
        `Erreur lors de la suppression de l'utilisateur; ${err.message}`,
      );
      throw new Error("Impossible de supprimer l'utilisateur");
    }
  },
};

export default userController;
