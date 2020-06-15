import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ClassState } from './class.state';
import { Store, Select } from '@ngxs/store';
import { ClassRecord } from './Models/Class';
import { Observable } from 'rxjs';
import { Class } from './class.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'ngxsdemo';

  @Select(ClassState.allClass) class$: Observable<ClassRecord[]>;

  @Select(ClassState.lastClass) last$: Observable<ClassRecord>;

  constructor(
    private store: Store,
  ) {
    this.class$.subscribe(v => {
      console.log('class', JSON.stringify(v));
    })

    store.dispatch(new Class.Add({id: 2, name: '資二忠', students: []}));
  }

  ngOnInit(): void {
  }

  changeName() {
    this.store.dispatch(new Class.Rename({id: 2, newName: '資三忠'}));
  }
}
