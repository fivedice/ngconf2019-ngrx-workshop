import { Book } from "src/app/shared/models/book.model";
import {
  BookPageActionType,
  BookPageActions
} from "src/app/books/actions/books-page.actions";
import { createEntityAdapter, EntityState, EntityAdapter } from "@ngrx/entity";
import { createSelector } from "@ngrx/store";
import {
  BookApiActions,
  BookApiActionsTypes
} from "src/app/books/actions/books-api.actions";

export interface BookState extends EntityState<Book> {
  activeBookId: string | null;
}

const initialBooks: Book[] = [
  {
    id: "1",
    name: "Fellowship of the Ring",
    earnings: 100000000,
    description: "The start"
  },
  {
    id: "2",
    name: "The Two Towers",
    earnings: 200000000,
    description: "The middle"
  },
  {
    id: "3",
    name: "The Return of The King",
    earnings: 400000000,
    description: "The end"
  }
];

const adapter: EntityAdapter<Book> = createEntityAdapter({
  sortComparer: (a: Book, b: Book): number => a.name.localeCompare(b.name)
});

const initialState = adapter.getInitialState({
  activeBookId: null
});

export function reducer(
  state: BookState = initialState,
  action: BookPageActions | BookApiActions
): BookState {
  switch (action.type) {
    case BookApiActionsTypes.BooksLoaded:
      return adapter.addAll(initialBooks, state);

    case BookPageActionType.SELECT:
      return { ...state, activeBookId: action.id };

    case BookPageActionType.CLEAR_SELECTION:
      return { ...state, activeBookId: null };

    case BookPageActionType.CREATE:
      return adapter.addOne(action.book, {
        ...state,
        activeBookId: action.book.id
      });

    case BookPageActionType.UPDATE:
      return adapter.updateOne(
        // id is the id of the entity to change
        // change is what you want to change it to
        { id: action.book.id, changes: action.book },
        state
      );

    case BookPageActionType.DELETE:
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
