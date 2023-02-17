import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

@Component({
  template: `
    <h5 class="title" highlight>Default</h5>
    <h5 highlight="yellow">Yellow</h5>
    <p highlight="blue">parrafo</p>
    <p>otro parrafo</p>
    <input type="text" [(ngModel)]="color" [highlight]="color" />
  `,
})
class HostComponent {
  color = 'tomato';
}

describe('HighlightDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, HighlightDirective],
      imports: [FormsModule],
    });

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have one elements without highlight directive', () => {
    //Arrange
    // const elements = fixture.debugElement.queryAll(By.css('*[highlight]')); //* this is a valid css selector
    const elementsWithputHighlight = fixture.debugElement.queryAll(
      By.css('*:not([highlight])')
    ); //* this is a valid css selector to elements without the highlight attribute
    const elements = fixture.debugElement.queryAll(
      By.directive(HighlightDirective)
    ); //* By grant to us a directive method
    //Act
    //Assert
    expect(elements.length).toEqual(4);
    expect(elementsWithputHighlight.length).toEqual(2);
  });

  it('should the elements be match with bgColor', () => {
    //Arrange
    const elements = fixture.debugElement.queryAll(
      By.directive(HighlightDirective)
    );
    //Act
    //Assert
    expect(elements[0].nativeElement.style.backgroundColor).toEqual('gray');
    expect(elements[1].nativeElement.style.backgroundColor).toEqual('yellow');
    expect(elements[2].nativeElement.style.backgroundColor).toEqual('blue');
  });

  it('should title h5 be match with the default bgColor', () => {
    //Arrange
    const titleDebugger = fixture.debugElement.query(By.css('.title'));
    const directive = titleDebugger.injector.get(HighlightDirective); //This way we get the directive injection instance
    //Act
    //Assert
    expect(titleDebugger.nativeElement.style.backgroundColor).toEqual(
      directive.defaultColor
    );
  });

  it('should bind <input> and change the bgColor', () => {
    const inputDebug = fixture.debugElement.query(By.css('input'));
    const inputEl: HTMLInputElement = inputDebug.nativeElement;
    const mockColor = 'red';
    expect(inputEl.style.backgroundColor).toEqual(component.color);

    inputEl.value = mockColor;
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputEl.style.backgroundColor).toEqual(mockColor);
    expect(component.color).toEqual(mockColor);
  });
});
