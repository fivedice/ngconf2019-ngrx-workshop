import { createAction, props } from "@ngrx/store";
import { Book } from "src/app/shared/models/book.model";

export const enter = createAction("[Book Page] Enter");
export const selectBook = createAction(
  "[Book Page] Select Book",
  props<{ id: string }>()
);
export const clearSelection = createAction("[Book Page] Clear Selection");
export const createBook = createAction(
  "[Book Page] Create Book",
  props<{ book: Book }>()
);
export const updateBook = createAction(
  "[Book Page] Update Book",
  props<{ book: Book }>()
);
export const deleteBook = createAction(
  "[Book Page] Delete Book",
  props<{ book: Book }>()
);

export type Union = ReturnType<
  | typeof selectBook
  | typeof clearSelection
  | typeof enter
  | typeof createBook
  | typeof updateBook
  | typeof deleteBook
>;
