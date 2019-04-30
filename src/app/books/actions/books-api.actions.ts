import { Book } from "src/app/shared/models/book.model";
import { createAction, props } from "@ngrx/store";

export const booksLoaded = createAction(
  "[Book API] Books Loaded Success",
  props<{ books: Book[] }>()
);
export const bookCreated = createAction(
  "[Book API] Book Created Success",
  props<{ book: Book }>()
);
export const bookUpdated = createAction(
  "[Book API] Book Updated Success",
  props<{ book: Book }>()
);
export const bookDeleted = createAction(
  "[Book API] Book Deleted Success",
  props<{ book: Book }>()
);

export type Union = ReturnType<
  | typeof booksLoaded
  | typeof bookCreated
  | typeof bookUpdated
  | typeof bookDeleted
>;
