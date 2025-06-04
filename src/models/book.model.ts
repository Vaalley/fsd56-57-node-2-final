import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { categories } from "./category.model";

export const books = pgTable("books", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull().unique(),
  author: varchar("author", { length: 255 }).notNull().unique(),
  category_id: uuid("category_id").references(() => categories.id).notNull(),
});
