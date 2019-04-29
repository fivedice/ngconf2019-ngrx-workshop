import { Book } from "src/app/shared/models/book.model";
import {
  BookPageActionType,
  BookPageActions
} from "src/app/books/actions/books-page.actions";
import { createEntityAdapter, EntityState, EntityAdapter } from "@ngrx/entity";

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

const adapter: EntityAdapter<Book> = createEntityAdapter();
const initialState = adapter.getInitialState({
  activeBookId: null
});

const createBook = (books: Book[], book: Book) => [...books, book];
const updateBook = (books: Book[], book: Book) =>
  books.map(w => {
    return w.id === book.id ? Object.assign({}, book) : w;
  });
const deleteBook = (books: Book[], book: Book) =>
  books.filter(w => book.id !== w.id);

export function reducer(
  state: BookState = initialState,
  action: BookPageActions
): BookState {
  switch (action.type) {
    case BookPageActionType.ENTER:
      return adapter.addAll(initialBooks, state);

    case BookPageActionType.SELECT:
      return { ...state, activeBookId: action.id };

    case BookPageActionType.CLEAR_SELECTION:
      return { ...state, activeBookId: null };

    case BookPageActionType.CREATE:
      return adapter.addOne(action.book, state);

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
