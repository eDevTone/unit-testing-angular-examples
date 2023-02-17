import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {
  people: Array<Person> = [
    new Person('Esteban', 'Qs', 27, 89, 1.77),
    new Person('Valentin', 'Feregrino', 12, 2, 3),
  ];
  selectedPerson: Person | null = null;
  constructor() {}

  ngOnInit(): void {}

  choose(person: Person): void {
    this.selectedPerson = person;
  }
}
