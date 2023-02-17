import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';
import { PersonComponent } from '../person/person.component';

import { PeopleComponent } from './people.component';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleComponent, PersonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list app-person componenets', () => {
    //Arrange
    component.people = [
      new Person('Esteban', 'Qs', 27, 89, 1.77),
      new Person('Valentin', 'Feregrino', 25, 2, 3),
      new Person('Antoio', 'Feregrino', 26, 2, 3),
    ];
    //Act
    fixture.detectChanges();
    const peopleDebug = fixture.debugElement.queryAll(By.css('app-person'));
    //Assert
    expect(peopleDebug.length).toEqual(component.people.length);
  });

  it('should render a person selected from app-person', () => {
    //Arrange
    component.people = [
      new Person('Esteban', 'Qs', 27, 89, 1.77),
      new Person('Valentin', 'Feregrino', 12, 2, 3),
      new Person('Antoio', 'Feregrino', 12, 2, 3),
    ];
    const spy = spyOn(component, 'choose').and.callThrough();

    //Act
    fixture.detectChanges();
    const peopleDebug = fixture.debugElement.queryAll(By.css('app-person'));
    peopleDebug[1].query(By.css('button.btn-choose')).triggerEventHandler('click', null);
    fixture.detectChanges();  
    const renderPersonList = fixture.debugElement.queryAll(By.css('li'));

    //Assert
    expect(spy).toHaveBeenCalled();
    expect(renderPersonList[0].nativeElement.textContent).toContain(component.people[1].name);
    expect(renderPersonList[1].nativeElement.textContent).toContain(component.people[1].age);
  });
});
