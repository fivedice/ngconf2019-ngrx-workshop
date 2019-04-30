import { Component, OnInit } from "@angular/core";
import { Book } from "src/app/shared/models/book.model";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromRoot from "src/app/shared/state";
import * as fromBook from "../../actions/books-page.actions";
import { map, tap } from "rxjs/operators";

@Component({
  selector: "app-books",
  templateUrl: "./books-page.component.html",
  styleUrls: ["./books-page.component.css"]
})
export class BooksPageComponent implements OnInit {
  books$: Observable<Book[]>;
  currentBook$: Observable<Book>;
  total$: Observable<number>;

  constructor(private store: Store<fromRoot.State>) {
    this.books$ = this.store.pipe(select(fromRoot.selectAllBooks));
    this.currentBook$ = this.store.pipe(select(fromRoot.selectActiveBook));
    this.total$ = this.store.pipe(select(fromRoot.selectBookEarningsTotal));

    this.currentBook$ = this.store.pipe(
      select(state => state.books),
      map((bookState: any) => bookState.entities[bookState.activeBookId])
    );
  }

  ngOnInit() {
    this.removeSelectedBook();
    this.store.dispatch(fromBook.enter());
  }

  onSelect(book: Book) {
    this.store.dispatch(fromBook.selectBook({ id: book.id }));
  }

  onCancel() {
    this.store.dispatch(fromBook.clearSelection());
  }

  removeSelectedBook() {
    this.store.dispatch(fromBook.clearSelection());
  }

  onSave(book: Book) {
    if (!book.id) {
      this.store.dispatch(fromBook.createBook({ book: book }));
    } else {
      this.store.dispatch(fromBook.updateBook({ book: book }));
    }
  }
  onDelete(book: Book) {
    this.store.dispatch(fromBook.deleteBook({ book: book }));
  }
}
