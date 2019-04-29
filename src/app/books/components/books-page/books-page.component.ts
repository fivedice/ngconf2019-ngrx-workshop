import { Component, OnInit } from "@angular/core";
import { Book } from "src/app/shared/models/book.model";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromRoot from "src/app/shared/state";

@Component({
  selector: "app-books",
  templateUrl: "./books-page.component.html",
  styleUrls: ["./books-page.component.css"]
})
export class BooksPageComponent implements OnInit {
  books: Book[];
  currentBook: Book;
  total: number;
  books$: Observable<Book[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.books$ = this.store.pipe(select(fromRoot.selectBooks));
  }

  ngOnInit() {
    this.removeSelectedBook();
  }

  updateTotals(books: Book[]) {
    this.total = books.reduce((total, book) => {
      return total + parseInt(`${book.earnings}`, 10) || 0;
    }, 0);
  }

  onSelect(book: Book) {
    this.store.dispatch({ type: "select", payload: book });
  }

  onCancel() {
    this.store.dispatch({ type: "clear select" });
  }

  removeSelectedBook() {
    this.store.dispatch({ type: "clear select" });
  }

  onSave(book: Book) {
    if (!book.id) {
      this.store.dispatch({ type: "create", payload: book });
    } else {
      this.store.dispatch({ type: "update", payload: book });
    }
  }
  onDelete(book: Book) {
    this.store.dispatch({ type: "delete", payload: book });
  }
}
