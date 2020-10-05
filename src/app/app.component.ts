import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'GridBotCalculator';
  tokenPriceMax = 20;
  tokenPriceMin = 10;
  tokenQuantity = 1;
  stepNumber = 100;
  profit = 10;;
  percentStep: number;
  pricePercent: number;
  result: number;

  onSubmit() {
    this.checkInputAndReplaceIfNeeded();
    let priceTmp: number;
    this.pricePercent = 0;
    this.result = this.tokenPriceMax;  
    this.percentStep = (((this.tokenPriceMin - this.tokenPriceMax)/this.tokenPriceMax*100))/this.stepNumber;

    for (let i = 1; i <= this.stepNumber; i++) {
      priceTmp = this.tokenPriceMax*((100+this.percentStep*i)/100);
      this.pricePercent = this.tokenPriceMax - priceTmp;
      console.log('pricePercent: ', this.pricePercent); 
      console.log('i: ', i); 
      console.log('priceTmp: ', priceTmp);
      this.result = this.result + priceTmp;              
    }
  }

  checkInputAndReplaceIfNeeded() {
    if(this.tokenQuantity === undefined){
      this.tokenQuantity = 1;
    }
    if(this.stepNumber === undefined){
      this.stepNumber = 1;
    }
    if(this.profit === undefined){
      this.profit = 0;
    }
  }



















}