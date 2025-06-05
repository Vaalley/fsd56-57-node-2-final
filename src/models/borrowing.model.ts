import { NewBorrowing } from "../entities/borrowing.entity";
import { db } from "../config/pool";
import logger from "../utils/logger";
import { borrowings } from "../schemas";
import { eq } from "drizzle-orm";

export const borrowingModel = {
  getAll: () => {
    try {
      return db.select().from(borrowings);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération des emprunts; ${err.message}`,
      );
      throw new Error("Impossible de récupérer les emprunts");
    }
  },
  get: (id: string) => {
    try {
      return db.query.borrowings.findFirst({
        where: eq(borrowings.id, id),
        with: {
          users: true,
          books: true,
        },
      });
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération de l'emprunt; ${err.message}`,
      );
      throw new Error("Impossible de récupérer l'emprunt");
    }
  },
  create: (borrowing: NewBorrowing) => {
    try {
      return db.insert(borrowings).values(borrowing);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la création de l'emprunt; ${err.message}`,
      );
      throw new Error("Impossible de créer l'emprunt");
    }
  },
  update: (id: string, borrowing: NewBorrowing) => {
    try {
      return db.update(borrowings).set(borrowing).where(
        eq(borrowings.id, id),
      );
    } catch (err: any) {
      logger.error(
        `Erreur lors de la mise à jour de l'emprunt; ${err.message}`,
      );
      throw new Error("Impossible de mettre à jour l'emprunt");
    }
  },
  delete: (id: string) => {
    try {
      return db.delete(borrowings).where(eq(borrowings.id, id));
    } catch (err: any) {
      logger.error(
        `Erreur lors de la suppression de l'emprunt; ${err.message}`,
      );
      throw new Error("Impossible de supprimer l'emprunt");
    }
  },
};
