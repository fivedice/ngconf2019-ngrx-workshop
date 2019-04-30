import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import {
  mergeMap,
  map,
  catchError,
  exhaustMap,
  concatMap
} from "rxjs/operators";
import * as fromBooks from "./actions";
import { BooksService } from "../shared/services/book.service";
import { Book } from "../shared/models/book.model";
import { EMPTY } from "rxjs";
import { BookPageActions } from "./actions/books-page.actions";

@Injectable()
export class BookApiEffects {
  constructor(private action$: Actions, private booksService: BooksService) {}

  @Effect()
  loadBooks$ = this.action$.pipe(
    ofType(fromBooks.BooksPageActions.BookPageActionType.ENTER),
    exhaustMap(() => {
      return this.booksService.all().pipe(
        map(
          (books: Book[]) => new fromBooks.BooksApiActions.BooksLoaded(books)
        ),
        catchError(() => EMPTY)
      );
    })
  );

  @Effect()
  createBook$ = this.action$.pipe(
    ofType(fromBooks.BooksPageActions.BookPageActionType.CREATE),
    concatMap((action: fromBooks.BooksPageActions.Create) =>
      this.booksService.create(action.book).pipe(
        map((book: Book) => new fromBooks.BooksApiActions.BookCreated(book)),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  updateBook$ = this.action$.pipe(
    ofType(fromBooks.BooksPageActions.BookPageActionType.UPDATE),
    concatMap((action: fromBooks.BooksPageActions.Update) =>
      this.booksService.update(action.book.id, action.book).pipe(
        map((book: Book) => new fromBooks.BooksApiActions.BookUpdated(book)),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  deleteBook$ = this.action$.pipe(
    ofType(fromBooks.BooksPageActions.BookPageActionType.DELETE),
    mergeMap((action: fromBooks.BooksPageActions.Delete) =>
      this.booksService.delete(action.book.id).pipe(
        map(() => new fromBooks.BooksApiActions.BookDeleted(action.book)),
        catchError(() => EMPTY)
      )
    )
  );
}
