import { Request, Response } from "express";

import { bookModel } from "../models/book.model";
import { APIResponse } from "../utils/apiResponse";
import logger from "../utils/logger";
import { NewBook } from "../entities/book.entity";

const bookController = {
  getAll: async (request: Request, response: Response) => {
    try {
      const books = await bookModel.getAll();
      return APIResponse(response, books, "Livres récupérés", 200);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération des livres; ${err.message}`,
      );
      throw new Error("Impossible de récupérer les livres");
    }
  },
  get: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const book = await bookModel.get(id);
      return APIResponse(response, book, "Livre récupéré", 200);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération du livre; ${err.message}`,
      );
      throw new Error("Impossible de récupérer le livre");
    }
  },
  create: async (request: Request, response: Response) => {
    try {
      const book: NewBook = request.body;
      const newBook = await bookModel.create(book);
      return APIResponse(response, newBook, "Livre créé", 201);
    } catch (err: any) {
      logger.error(`Erreur lors de la création du livre; ${err.message}`);
      throw new Error("Impossible de créer le livre");
    }
  },
  update: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const book: NewBook = request.body;
      const updatedBook = await bookModel.update(id, book);
      return APIResponse(response, updatedBook, "Livre mis à jour", 200);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la mise à jour du livre; ${err.message}`,
      );
      throw new Error("Impossible de mettre à jour le livre");
    }
  },
  delete: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const deletedBook = await bookModel.delete(id);
      return APIResponse(response, deletedBook, "Livre supprimé", 200);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la suppression du livre; ${err.message}`,
      );
      throw new Error("Impossible de supprimer le livre");
    }
  },
};

export default bookController;
