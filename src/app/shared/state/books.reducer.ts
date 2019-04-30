import { Book } from "src/app/shared/models/book.model";
import { createEntityAdapter, EntityState, EntityAdapter } from "@ngrx/entity";
import { createSelector } from "@ngrx/store";
import { BooksPageActions, BooksApiActions } from "src/app/books/actions";

export interface BookState extends EntityState<Book> {
  activeBookId: string | null;
}

export const adapter: EntityAdapter<Book> = createEntityAdapter({
  // sortComparer: (a: Book, b: Book): number => a.name.localeCompare(b.name)
});

export const initialState = adapter.getInitialState({
  activeBookId: null
});

export function reducer(
  state: BookState = initialState,
  action: BooksPageActions.Union | BooksApiActions.Union
): BookState {
  switch (action.type) {
    case BooksApiActions.booksLoaded.type:
      return adapter.addAll(action.books, state);

    case BooksPageActions.selectBook.type:
      return { ...state, activeBookId: action.id };

    case BooksPageActions.clearSelection.type:
      return { ...state, activeBookId: null };

    case BooksApiActions.bookCreated.type:
      return adapter.addOne(action.book, {
        ...state,
        activeBookId: action.book.id
      });

    case BooksApiActions.bookUpdated.type:
      return adapter.updateOne(
        // id is the id of the entity to change
        // change is what you want to change it to
        { id: action.book.id, changes: action.book },
        state
      );

    case BooksApiActions.bookDeleted.type:
      return adapter.removeOne(action.book.id, {
        ...state,
        activeBookId: null
      });

    default:
      return state;
  }
}

// I don't like that we are defining selectors in the reducer but we need the adapter?!...
export const { selectEntities, selectAll } = adapter.getSelectors();
export const selectActiveBookId = (state: BookState) => state.activeBookId;
export const selectActiveBook = createSelector(
  selectEntities,
  selectActiveBookId,
  (books, activeBookId: string) => books[activeBookId]
);

export const selectEarningsTotal = createSelector(
  selectAll,
  books =>
    books.reduce(
      (total, book) => total + parseInt(`${book.earnings}`, 10) || 0,
      0
    )
);
