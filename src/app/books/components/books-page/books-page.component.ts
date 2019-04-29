import { Component, OnInit } from "@angular/core";
import { Book } from "src/app/shared/models/book.model";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromRoot from "src/app/shared/state";
import * as fromBook from "../../actions/books-page.actions";

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
  currentBook$: Observable<Book>;

  constructor(private store: Store<fromRoot.State>) {
    this.books$ = this.store.pipe(select(fromRoot.selectBooks));
    this.currentBook$ = this.store.pipe(select(fromRoot.selectCurrentBook));
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
    this.store.dispatch(new fromBook.Select(book.id));
  }

  onCancel() {
    this.store.dispatch(new fromBook.ClearSelect());
  }

  removeSelectedBook() {
    this.store.dispatch(new fromBook.ClearSelect());
  }

  onSave(book: Book) {
    if (!book.id) {
      this.store.dispatch(new fromBook.Create(book));
    } else {
      this.store.dispatch(new fromBook.Update(book));
    }
  }
  onDelete(book: Book) {
    this.store.dispatch(new fromBook.Delete(book));
  }
}
