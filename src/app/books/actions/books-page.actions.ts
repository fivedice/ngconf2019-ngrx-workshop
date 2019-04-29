import { Action } from "@ngrx/store";
import { Book } from "src/app/shared/models/book.model";

export enum BookPageActionType {
  SELECT = "[Book] - Select",
  CLEAR_SELECTION = "[Book] - Clear Select",
  CREATE = "[Book] - Create",
  UPDATE = "[Book] - Update",
  DELETE = "[Book] - Delete"
}

export class Select implements Action {
  readonly type = BookPageActionType.SELECT;
  constructor(public payload: string) {}
}

export class ClearSelect implements Action {
  readonly type = BookPageActionType.CLEAR_SELECTION;
  constructor() {}
}
export class Create implements Action {
  readonly type = BookPageActionType.CREATE;
  constructor(public payload: Book) {}
}

export class Update implements Action {
  readonly type = BookPageActionType.UPDATE;
  constructor(public payload: Book) {}
}

export class Delete implements Action {
  readonly type = BookPageActionType.DELETE;
  constructor(public payload: Book) {}
}

export type BookPageActions = Select | ClearSelect | Create | Update | Delete;
