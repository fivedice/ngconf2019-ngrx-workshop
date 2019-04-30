import {
  reducer,
  initialState,
  adapter,
  selectAll,
  selectActiveBookId
} from "./books.reducer";
import {
  booksLoaded,
  bookCreated,
  bookDeleted
} from "src/app/books/actions/books-api.actions";

describe("Books Reducer", () => {
  it("should return the initial state when initialized", () => {
    const state = reducer(undefined, { type: "@@init" } as any); // as any due to TS safety
    expect(state).toBe(initialState);
  });

  it("can load all books", () => {
    // Could do this with the adapter too:
    const action = booksLoaded({
      books: [{ id: "1", earnings: 1, name: "something" }]
    });
    const state = reducer(initialState, action);
    expect(state).toMatchSnapshot();
  });

  it("can create a book", () => {
    const action = bookCreated({
      book: { id: "1", earnings: 1, name: "something" }
    });
    const state = reducer(initialState, action);
    expect(state).toMatchSnapshot();
  });

  it("can delete a book", () => {
    const addAction = bookCreated({
      book: { id: "1", earnings: 1, name: "something" }
    });
    const deleteAction = bookDeleted({
      book: { id: "1", earnings: 1, name: "something" }
    });
    const state = [addAction, deleteAction].reduce(reducer, initialState);
    expect(state).toMatchSnapshot();
  });

  describe("Selectors", () => {
    it("can select all books", () => {
      const state = adapter.addAll(
        [{ id: "1", earnings: 1, name: "something" }],
        initialState
      );
      expect(selectAll(state).length).toBe(1);
    });

    it("can return the active book", () => {
      const state = adapter.addAll(
        [{ id: "1", earnings: 1, name: "something" }],
        { ...initialState, activeBookId: "1" }
      );
      expect(selectActiveBookId(state)).toBe("1");
    });
  });
});
