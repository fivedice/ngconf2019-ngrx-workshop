import {
  ActionReducerMap,
  createSelector,
  MetaReducer,
  select
} from "@ngrx/store";
import * as fromMovies from "./movie.reducer";
import * as fromBooks from "./books.reducer";
import { stat } from "fs";

export interface State {
  movies: fromMovies.State;
  books: fromBooks.BookState;
}

export const reducers: ActionReducerMap<State> = {
  movies: fromMovies.reducer,
  books: fromBooks.reducer
};

export const metaReducers: MetaReducer<State>[] = [];

/**
 * Selectors
 */
export const selectMovieState = (state: State) => state.movies;

export const selectMovieEntities = createSelector(
  selectMovieState,
  fromMovies.selectEntities
);

export const selectMovies = createSelector(
  selectMovieState,
  fromMovies.selectAll
);

export const selectActiveMovieId = createSelector(
  selectMovieState,
  fromMovies.selectActiveMovieId
);

export const selectActiveMovie = createSelector(
  selectMovieState,
  fromMovies.selectActiveMovie
);

export const selectMoviesEarningsTotal = createSelector(
  selectMovieState,
  fromMovies.selectEarningsTotal
);

export const selectBookState = (state: State) => state.books;

export const selectBooks = createSelector(
  selectBookState,
  state => state.books
);

export const selectCurrentBook = createSelector(
  selectBookState,
  state => state.books.find(b => b.id === state.activeBookId)
);
