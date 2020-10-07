import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  private name = 'GridBotCalculator';
  private tokenPriceMax: number;
  private tokenPriceMin: number;
  private tokenQuantityByStep: number;
  private defaultStepNumber: number;
  private profit: number;
  private percentStep: number;
  private priceForStep: number;
  private defaultTotalSpending: number;
  private priceNow: number;
  private loseOrGainBeforeProfit: number;
  private totalLoseOrGain: number
  private totalSelling: number;
  private tokenPriceHigh: number;
  private tokenPriceLow: number;

  onInit() {
  }
  onSubmit() {
    this.checkInputAndReplaceIfNeeded();
    this.priceForStep = 0;
    this.percentStep = this.calculatePercentStep();
    this.calculateDefaultTotalSpending();
    this.calculateLoseOrGainBeforeProfit();
    this.calculateTotalLoseOrGain();
    this.calculateTotalSelling()
  }

  calculateTotalSelling() {
    this.totalSelling = this.priceNow*this.tokenQuantityByStep*this.defaultStepNumber;
  }

  calculateDefaultTotalSpending() {
    let topPrice;
    let botPrice;
    let stepNumber;
    if(this.isDefault()) {
      topPrice = this.tokenPriceMax;
      botPrice = this.tokenPriceMin;
      stepNumber = this.defaultStepNumber;
    } else {
      topPrice = this.tokenPriceHigh;
      botPrice = this.tokenPriceLow;
      stepNumber = this.calculateStepNumber;
    }
        console.log('stepNumber ', stepNumber)
    this.defaultTotalSpending = topPrice;
    let priceTmp: number;
    for (let i = 1; i <= stepNumber; i++) {
      priceTmp = this.tokenPriceMax*((100+this.percentStep*i)/100)*this.tokenQuantityByStep;
      this.priceForStep = this.tokenPriceMax - priceTmp;
      this.defaultTotalSpending = this.defaultTotalSpending + priceTmp;    
    }
  }

  calculateStepNumber() {
    return (this.tokenPriceHigh - this.tokenPriceLow)/(this.percentStep);
    console.log(this.percentStep)
  }

  isDefault() {
    if(this.tokenPriceHigh === undefined && this.tokenPriceHigh === undefined) {
      return true;
    } else {
      return false;
    }
  }

  calculateTotalLoseOrGain() {
    this.totalLoseOrGain = this.loseOrGainBeforeProfit + this.profit;
  }

  calculateLoseOrGainBeforeProfit() {
    this.loseOrGainBeforeProfit = (this.tokenQuantityByStep*this.defaultStepNumber*this.priceNow) - this.defaultTotalSpending;
  }

  calculatePercentStep() {
    return (((this.tokenPriceMin - this.tokenPriceMax)/this.tokenPriceMax*100))/this.defaultStepNumber;
  }

  checkInputAndReplaceIfNeeded() {
    if(this.tokenQuantityByStep === undefined){
      this.tokenQuantityByStep = 1;
    }
    if(this.defaultStepNumber === undefined){
      this.defaultStepNumber = 1;
    }
    if(this.profit === undefined){
      this.profit = 0;
    }
    if(this.priceNow === undefined){
      this.priceNow = this.tokenPriceMin;
    }
  }



















}