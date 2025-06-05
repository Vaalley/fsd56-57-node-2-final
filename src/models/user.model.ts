import { eq } from "drizzle-orm";
import { db } from "../config/pool";
import logger from "../utils/logger";

import { users } from "../schemas";
import { NewUser } from "../entities/user.entity";

export const userModel = {
  getAll: () => {
    try {
      return db.select({
        id: users.id,
        username: users.username,
      }).from(users);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération des utilisateurs; ${err.message}`,
      );
      throw new Error("Impossible de récupérer les utilisateurs");
    }
  },
  get: (id: string) => {
    try {
      return db.query.users.findFirst({
        where: eq(users.id, id),
        columns: {
          id: true,
          username: true,
        },
        with: {
          borrowings: {
            columns: {
              id: true,
              user_id: true,
              book_id: true,
              borrow_date: true,
              return_date: true,
            },
            with: {
              books: {
                columns: {
                  id: true,
                  title: true,
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
              },
            },
          },
        },
      });
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération de l'utilisateur; ${err.message}`,
      );
      throw new Error("Impossible de récupérer l'utilisateur");
    }
  },
  findByCredentials: (email: string) => {
    try {
      return db.select({
        id: users.id,
        password: users.password,
        username: users.username,
        email: users.email,
      }).from(users)
        .where(
          eq(users.email, email),
        );
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération de l'utilisateur; ${err.message}`,
      );
      throw new Error("Impossible de récupérer l'utilisateur");
    }
  },
  create: (user: NewUser) => {
    try {
      return db.insert(users).values(user).returning({ id: users.id });
    } catch (err: any) {
      logger.error(
        `Erreur lors de la création de l'utilisateur; ${err.message}`,
      );
      throw new Error("Impossible de créer l'utilisateur");
    }
  },
  update: (id: string, user: NewUser) => {
    try {
      return db.update(users).set(user).where(eq(users.id, id));
    } catch (err: any) {
      logger.error(
        `Erreur lors de la mise à jour de l'utilisateur; ${err.message}`,
      );
      throw new Error("Impossible de mettre à jour l'utilisateur");
    }
  },
  delete: (id: string) => {
    try {
      return db.delete(users).where(eq(users.id, id));
    } catch (err: any) {
      logger.error(
        `Erreur lors de la suppression de l'utilisateur; ${err.message}`,
      );
      throw new Error("Impossible de supprimer l'utilisateur");
    }
  },
};
