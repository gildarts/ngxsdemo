import { State, Action, StateContext, StateToken, Selector } from '@ngxs/store';
import { ClassRecord } from './Models/Class';
import { Injectable } from '@angular/core';
import { Class } from './class.action';
import { last } from 'lodash';

type ClassContext = StateContext<ClassStateModel>;

export interface ClassStateModel {
  allClass: ClassRecord[];
}

export const CLASS_STATE_TOKEN = new StateToken<ClassStateModel>('class');

@State<ClassStateModel>({
  name: CLASS_STATE_TOKEN,
  defaults: { // 預設值。
    allClass: [{id: 1, name: '資一忠', students: []}],
  }
})
@Injectable()
export class ClassState {
  constructor() {}

  @Selector<ClassStateModel>()
  static allClass(state: ClassStateModel) {
    return state.allClass;
  }

  @Selector<ClassStateModel>()
  static lastClass(state: ClassStateModel) {
    return last(state.allClass);
  }

  @Action(Class.Add)
  add(ctx: ClassContext, action: Class.Add) {
    const state = ctx.getState();

    ctx.patchState({
      allClass: [...state.allClass, action.payload],
    })
  }

  @Action(Class.Rename)
  rename(ctx: ClassContext, action: Class.Rename) {
    const state = ctx.getState();
    const records = [...state.allClass];

    const idx = records.findIndex(v => v.id === action.payload.id);

    if(idx >= 0) {
      const record = {...records[idx]};
      record.name = action.payload.newName;

      records.splice(idx, 1, record);

      ctx.patchState({
        allClass: records,
      })
    }
  }
}
