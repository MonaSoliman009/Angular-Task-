import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private _GlobalService:GlobalService){}
  EURtoUSD:number = 0;
  convertedAmount:number = 0;
  availableCurrencies:string[]=[];
  popularCurrencies:string[]=[]

  public model = {
    amount: '',
    from: 'EUR',
    to: 'USD',
  };
  ngOnInit() {
    this._GlobalService.getEURtoUSD().subscribe(res => {
    this.EURtoUSD=res.rates.USD
    console.log('data response',res );

    });
    this._GlobalService.availableCurrencies().subscribe(res => {
      this.availableCurrencies=Object.keys(res.symbols) 
      });

  }
   onSubmit(form:any) {
    console.log(form.value);
    
    if (form.valid) {
      var {from,to,amount}=form.value;
      this._GlobalService.converter(from,to,amount).subscribe(res => {
        // this.convertedAmount=(res.result==undefined)?0:res.result
        this.popularCurrencies=Object.keys(res.rates)
        console.log('data response',res.rates );

        });
    }
  }
}
