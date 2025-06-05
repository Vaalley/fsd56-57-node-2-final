import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { users } from "./user.schema";
import { books } from "./book.schema";

export const borrowings = pgTable("borrowings", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: uuid("user_id").references(() => users.id).notNull(),
  book_id: uuid("book_id").references(() => books.id).notNull(),
  borrow_date: varchar("borrow_date", { length: 255 }).notNull(),
  return_date: varchar("return_date", { length: 255 }).notNull(),
});
