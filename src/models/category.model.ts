import { NewCategory } from "../entities/category.entity";
import { db } from "../config/pool";
import logger from "../utils/logger";
import { categories } from "../schemas";
import { eq } from "drizzle-orm";

export const categoryModel = {
  getAll: () => {
    try {
      return db.select().from(categories);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération des catégories; ${err.message}`,
      );
      throw new Error("Impossible de récupérer les catégories");
    }
  },
  get: (id: string) => {
    try {
      return db.query.categories.findFirst({
        where: eq(categories.id, id),
        with: {
          books: true,
        },
      });
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération de la catégorie; ${err.message}`,
      );
      throw new Error("Impossible de récupérer la catégorie");
    }
  },
  create: (category: NewCategory) => {
    try {
      return db.insert(categories).values(category);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la création de la catégorie; ${err.message}`,
      );
      throw new Error("Impossible de créer la catégorie");
    }
  },
  update: (id: string, category: NewCategory) => {
    try {
      return db.update(categories).set(category).where(
        eq(categories.id, id),
      );
    } catch (err: any) {
      logger.error(
        `Erreur lors de la mise à jour de la catégorie; ${err.message}`,
      );
      throw new Error("Impossible de mettre à jour la catégorie");
    }
  },
  delete: (id: string) => {
    try {
      return db.delete(categories).where(eq(categories.id, id));
    } catch (err: any) {
      logger.error(
        `Erreur lors de la suppression de la catégorie; ${err.message}`,
      );
      throw new Error("Impossible de supprimer la catégorie");
    }
  },
};
