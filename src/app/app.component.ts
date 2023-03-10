import { Component, OnInit } from '@angular/core';
import { Calculator } from './calculator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-testing-services';

  ngOnInit(): void {
    const calculator = new Calculator();
    const result = calculator.multiply(3, 3);
    console.log(result === 9);
    console.log(calculator.divide(3, 0));
    console.log(calculator.divide(10, 0));
  }
}
