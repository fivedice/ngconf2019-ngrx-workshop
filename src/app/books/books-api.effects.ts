import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import {
  mergeMap,
  map,
  catchError,
  exhaustMap,
  concatMap
} from "rxjs/operators";
import { BooksService } from "../shared/services/book.service";
import { Book } from "../shared/models/book.model";
import { EMPTY } from "rxjs";
import { BooksPageActions, BooksApiActions } from "./actions";

@Injectable()
export class BookApiEffects {
  constructor(
    private action$: Actions<BooksPageActions.Union | BooksApiActions.Union>,
    private booksService: BooksService
  ) {}

  @Effect()
  loadBooks$ = this.action$.pipe(
    ofType(BooksPageActions.enter.type),
    exhaustMap(() => {
      return this.booksService.all().pipe(
        map((books: Book[]) => BooksApiActions.booksLoaded({ books: books })),
        catchError(() => EMPTY)
      );
    })
  );

  @Effect()
  createBook$ = this.action$.pipe(
    ofType(BooksPageActions.createBook.type),
    concatMap(action =>
      this.booksService.create(action.book).pipe(
        map((book: Book) => BooksApiActions.bookCreated({ book: book })),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  updateBook$ = this.action$.pipe(
    ofType(BooksPageActions.updateBook.type),
    concatMap(action =>
      this.booksService.update(action.book.id, action.book).pipe(
        map((book: Book) => BooksApiActions.bookUpdated({ book: book })),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  deleteBook$ = this.action$.pipe(
    ofType(BooksPageActions.deleteBook.type),
    mergeMap(action =>
      this.booksService.delete(action.book.id).pipe(
        map(() => BooksApiActions.bookDeleted({ book: action.book })),
        catchError(() => EMPTY)
      )
    )
  );
}
