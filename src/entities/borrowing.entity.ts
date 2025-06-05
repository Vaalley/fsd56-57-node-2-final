import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { borrowings } from "../schemas";

export type Borrowing = InferSelectModel<typeof borrowings>;

export type NewBorrowing = InferInsertModel<typeof borrowings>;
