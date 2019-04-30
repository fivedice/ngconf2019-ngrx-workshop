import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, exhaustMap } from "rxjs/operators";
import * as fromBooks from "./actions";
import { BooksService } from "../shared/services/book.service";
import { Book } from "../shared/models/book.model";
import { EMPTY } from "rxjs";

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
}
