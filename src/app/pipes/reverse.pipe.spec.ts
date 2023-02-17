import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ReversePipe } from './reverse.pipe';

@Component({
  template: `
    <h3>Pipe</h3>
    <h5>{{ 'my text' | reverse }}</h5>
    <input type="text" [(ngModel)]="text" />
    <p>{{ text | reverse }}</p>
  `,
})
class HostComponent {
  text = '';
}

describe('ReversePipe', () => {

  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform "roma" to "amor"', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform('roma');
    expect(rta).toEqual('amor');
  });

  it('should transform "123" to "321"', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform('123');
    expect(rta).toEqual('321');
  });

  describe('ReversePipe from HostComponent', () => {
    let component: HostComponent;
    let fixture: ComponentFixture<HostComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ReversePipe, HostComponent],
        imports: [FormsModule]
      });
  
      fixture = TestBed.createComponent(HostComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the reverse text <h5>', () => {
      const pDebug = fixture.debugElement.query(By.css('h5'));
      expect(pDebug.nativeElement.textContent).toEqual('txet ym');
    });

    it('should apply reverse pipe when typing in the input', () => {
      const inputDebugger = fixture.debugElement.query(By.css('input'));
      const pDebug = fixture.debugElement.query(By.css('p'));

      const inputEl: HTMLInputElement = inputDebugger.nativeElement;
      const mockWord = 'roma';

      expect(pDebug.nativeElement.textContent).toEqual('');

      inputEl.value = mockWord;
      inputEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(pDebug.nativeElement.textContent).toEqual('amor');
    });
  });
});
