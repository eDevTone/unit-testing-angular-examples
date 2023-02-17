import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  @Input() public person!: Person;
  @Output() public onSelected: EventEmitter<Person> = new EventEmitter<Person>();
  public imc = '';

  constructor() {}

  ngOnInit(): void {}

  calcIMC() {
    this.imc = this.person.calcIMC();
  }

  onClick(): void {
    this.onSelected.emit(this.person);
  }
}
