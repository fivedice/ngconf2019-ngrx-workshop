import { Book } from "src/app/shared/models/book.model";
import { Action } from "@ngrx/store";

export enum BookApiActionsTypes {
  BooksLoaded = "[Book API] Books Loaded Success",
  BookCreated = "[Book API] Book Created Success",
  BookUpdated = "[Book API] Book Updated Success",
  BookDeleted = "[Book API] Book Deleted Success"
}

export class BooksLoaded implements Action {
  readonly type = BookApiActionsTypes.BooksLoaded;
  constructor(public books: Book[]) {}
}

export class BookCreated implements Action {
  readonly type = BookApiActionsTypes.BookCreated;
  constructor(public book: Book) {}
}

export class BookUpdated implements Action {
  readonly type = BookApiActionsTypes.BookUpdated;
  constructor(public book: Book) {}
}

export class BookDeleted implements Action {
  readonly type = BookApiActionsTypes.BookDeleted;
  constructor(public book: Book) {}
}

export type BookApiActions =
  | BooksLoaded
  | BookCreated
  | BookUpdated
  | BookDeleted;
