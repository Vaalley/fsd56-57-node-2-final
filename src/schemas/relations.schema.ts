import { relations } from "drizzle-orm";
import { users } from "./user.schema";
import { books } from "./book.schema";
import { borrowings } from "./borrowing.schema";
import { categories } from "./category.schema";

export const userRelations = relations(users, ({ many }) => ({
  borrowings: many(borrowings),
}));

export const bookRelations = relations(books, ({ many, one }) => ({
  borrowings: one(borrowings, {
    fields: [books.id],
    references: [borrowings.book_id],
  }),
  categories: one(categories, {
    fields: [books.category_id],
    references: [categories.id],
  }),
}));

export const borrowingRelations = relations(borrowings, ({ many, one }) => ({
  users: one(users, {
    fields: [borrowings.user_id],
    references: [users.id],
  }),
  books: one(books, {
    fields: [borrowings.book_id],
    references: [books.id],
  }),
}));

export const categoryRelations = relations(categories, ({ many }) => ({
  books: many(books),
}));
