import { NewBook } from "../entities/book.entity";
import { db } from "../config/pool";
import logger from "../utils/logger";
import { books } from "../schemas";
import { eq } from "drizzle-orm";

export const bookModel = {
  getAll: () => {
    try {
      return db.select({
        id: books.id,
        title: books.title,
        author: books.author,
        category_id: books.category_id,
      }).from(books);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération des livres; ${err.message}`,
      );
      throw new Error("Impossible de récupérer les livres");
    }
  },
  get: (id: string) => {
    try {
      return db.query.books.findFirst({
        where: eq(books.id, id),
        columns: {
          id: true,
          title: true,
          author: true,
          category_id: true,
        },
        with: {
          categories: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      });
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération du livre; ${err.message}`,
      );
      throw new Error("Impossible de récupérer le livre");
    }
  },
  create: (book: NewBook) => {
    try {
      return db.insert(books).values(book);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la création du livre; ${err.message}`,
      );
      throw new Error("Impossible de créer le livre");
    }
  },
  update: (id: string, book: NewBook) => {
    try {
      return db.update(books).set(book).where(eq(books.id, id));
    } catch (err: any) {
      logger.error(
        `Erreur lors de la mise à jour du livre; ${err.message}`,
      );
      throw new Error("Impossible de mettre à jour le livre");
    }
  },
  delete: (id: string) => {
    try {
      return db.delete(books).where(eq(books.id, id));
    } catch (err: any) {
      logger.error(
        `Erreur lors de la suppression du livre; ${err.message}`,
      );
      throw new Error("Impossible de supprimer le livre");
    }
  },
};
