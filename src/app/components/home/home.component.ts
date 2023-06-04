import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Coverter } from 'src/app/models/coverter';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit,OnDestroy {
  constructor(private _GlobalService: GlobalService) {}
  EURtoUSD: number = 0;
  convertedAmount: number = 0;
  availableCurrencies: string[] = [];
  popularCurrencies: string[] = [];
  currencies: number[] = [];
  currenciesNames: string[] = [];
  currenciesContainer: number[] = [];
  subscription1$: Subscription= new Subscription();
  subscription2$: Subscription = new Subscription();
     model:Coverter ={from:'EUR',to:'USD',amount:0}
  ngOnInit() {
    this.subscription1$= this._GlobalService.getEURtoUSD().subscribe((res) => {      
      this.EURtoUSD = res.rates.USD;
      this.currenciesNames = [
        'JPY',
        'GBP',
        'AUD',
        'CAD',
        'CHF',
        'HKD',
        'NZD',
        'JPY',
        'CNY',
      ];
      this.currenciesContainer = [
        res.rates.JPY,
        res.rates.GBP,
        res.rates.AUD,
        res.rates.CAD,
        res.rates.CHF,
        res.rates.HKD,
        res.rates.NZD,
        res.rates.JPY,
        res.rates.CNY,
      ];
   
    });
    this.subscription2$=  this._GlobalService.availableCurrencies().subscribe((res) => {
      this.availableCurrencies = Object.keys(res.symbols);
    });
  }
  onSubmit(form: any) {

    if (form.valid) {
      var {  amount } = form.value;
      this._GlobalService.updatefromAndToDetails(form.value)

      this.convertedAmount = this.EURtoUSD * amount;
      this.currencies=this.currenciesContainer
  
    }
  }
  ngOnDestroy() {
    this.subscription1$.unsubscribe()
    this.subscription2$.unsubscribe()

  }
}
