import { Book } from "src/app/shared/models/book.model";
import { Action } from "@ngrx/store";

export enum BookApiActionsTypes {
  BooksLoaded = "[Book API] Books Loaded"
}

export class BooksLoaded implements Action {
  readonly type = BookApiActionsTypes.BooksLoaded;
  constructor(public books: Book[]) {}
}

export type BookApiActions = BooksLoaded;
