import { ClassRecord } from './Models/Class';

export namespace Class {

  export class Add {
    static readonly type = '[Class API] Add';
    constructor(public payload: ClassRecord) {}
  }

  export class Rename {
    static readonly type = '[Class API] Rename';
    constructor(public payload: { id: number,  newName: string }) { }
  }

}
