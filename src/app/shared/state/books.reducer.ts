import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Book } from "src/app/shared/models/book.model";
import { Action, createSelector } from "@ngrx/store";

// const adapter = createEntityAdapter({
//   selectId: (book: Book) => book.id,
//   sortComparer: (a: Book, b: Book) => a.name.localeCompare(b.name)
// });

export interface BookState {
  //} extends EntityState<Book> {
  activeBookId: string | null;
  books: Book[];
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

// export const initialState: State = adapter.getInitialState({
//   activeBookId: null,
//   books: initialBooks
// });

export const initialState: BookState = {
  activeBookId: null,
  books: initialBooks
};

const createBook = (books: Book[], book: Book) => [...books, book];
const updateBook = (books: Book[], book: Book) =>
  books.map(w => {
    return w.id === book.id ? Object.assign({}, book) : w;
  });
const deleteBook = (books: Book[], book: Book) =>
  books.filter(w => book.id !== w.id);

export function reducer(
  state: BookState = initialState,
  action: any
): BookState {
  switch (action.type) {
    case "select":
      return { ...state, activeBookId: action.payload };

    case "clear select":
      return { ...state, activeBookId: null };

    case "create":
      return { ...state, books: createBook(state.books, action.payload) };

    case "update":
      return { ...state, books: updateBook(state.books, action.payload) };

    case "delete":
      return { ...state, books: deleteBook(state.books, action.payload) };

    default:
      return state;
  }
}
