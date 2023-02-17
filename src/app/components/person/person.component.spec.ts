import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); //life
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <h3> with "Hola, {person.name}"', () => {
    //Arrange
    component.person = new Person('Valentina', 'Molina', 27, 90, 177);
    const expectMsh = `Hola, ${component.person.name}`;
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const h3Element: HTMLElement = h3Debug.nativeElement;
    //Act
    fixture.detectChanges();

    //Assert
    expect(h3Element?.textContent).toEqual(expectMsh);
  });

  it('should have <p> with "Mi altura es {person.height}"', () => {
    //Arrange
    component.person = new Person('Esteban', 'Qs', 27, 90, 177);
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('p'));
    const pElement: HTMLElement = h3Debug.nativeElement;
    //Act
    fixture.detectChanges();
    //Assert
    expect(pElement?.textContent).toContain(component.person.height);
  });

  it('should the name be "Esteban"', () => {
    component.person = new Person('Esteban', 'Qs', 27, 90, 177);
    expect(component.person.name).toEqual('Esteban');
  });

  it('sholud display a text with IMC when call calcIMC', () => {
    //Arrange
    component.person = new Person('Esteban', 'Qs', 27, 120, 1.65);
    const expectMsg = 'overweight level';
    const button: HTMLElement = fixture.debugElement.query(
      By.css('button.btn-imc')
    ).nativeElement;
    //Act
    component.calcIMC();
    fixture.detectChanges();
    //Assert
    expect(button.textContent).toContain(expectMsg);
  });

  it('sholud display a text with IMC when do click', () => {
    //Arrange
    component.person = new Person('Esteban', 'Qs', 27, 120, 1.65);
    const expectMsg = 'overweight level';
    const buttonDebug = fixture.debugElement.query(By.css('button.btn-imc'));
    const buttonElement: HTMLElement = buttonDebug.nativeElement;
    const spy = spyOn(fixture.componentInstance, 'calcIMC').and.callThrough();
    //Act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    //Assert
    expect(spy).toHaveBeenCalled();
    expect(buttonElement.textContent).toContain(expectMsg);
  });

  it('should raise select event when do click', () => {
    //Arrange
    const expectPerson = new Person('Esteban', 'Qs', 27, 120, 1.65);
    const Event = {
      preventDefault: () => {},
    };
    component.person = expectPerson;
    const buttonDebug = fixture.debugElement.query(By.css('button.btn-choose'));
    const spy = spyOn(fixture.componentInstance, 'onClick').and.callThrough();
    // const spyEvent = spyOn(Event, 'preventDefault');
    let selectedPerson: Person | undefined;
    component.onSelected.subscribe((person) => {
      selectedPerson = person;
    });
    //Act
    buttonDebug.triggerEventHandler('click', Event);
    fixture.detectChanges();
    //Assert
    expect(spy).toHaveBeenCalled();
    // expect(spyEvent).toHaveBeenCalledTimes(2);
    expect(selectedPerson).toEqual(expectPerson);
  });
});

@Component({
  template: `<app-person
    [person]="person"
    (onSelected)="onSelected($event)"
  ></app-person>`,
})
class HostComponent {
  person: Person = new Person('Esteban', 'Qs', 27, 120, 1.65);
  selectedPerson!: Person | undefined;

  onSelected(person: Person) {
    this.selectedPerson = person;
  }
}

describe('PersonComponent from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, PersonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); //life
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display person name', () => {
    //Arrange
    const expectName = component.person.name;
    const personDebug = fixture.debugElement.query(By.css('app-person h3'));
    const h3Element = personDebug.nativeElement;
    //Act
    fixture.detectChanges();
    //Assert
    expect(h3Element.textContent).toContain(expectName);
  });

  it('should raise selected event when clicked', () => {
    //Arrange
    const expectPerson = component.person;
    const btnDebug = fixture.debugElement.query(By.css('app-person button.btn-choose'));
    const spy = spyOn(component, 'onSelected').and.callThrough();
    //Act
    btnDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    //Assert
    expect(spy).toHaveBeenCalled();
    expect(component.selectedPerson).toEqual(expectPerson);
  });
});
