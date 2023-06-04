import { Component,OnDestroy, OnInit} from '@angular/core';
import { Coverter } from 'src/app/models/coverter';
import { GlobalService } from 'src/app/services/global.service';
import { Location } from '@angular/common';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit,OnDestroy {
  availableCurrencies: string[] = [];
  canvas: any;
  ctx: any;
  EURtoUSD: number = 0;
  convertedAmount: number = 0;

  model: Coverter = { from: 'EUR', to: 'USD', amount: 0 };
  constructor(
    private _GlobalService: GlobalService,
    private _location: Location
  ) {}

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Hestorical Rates',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(0,0,0,0.3)',
      },
    ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };
  public lineChartLegend = true;
  subscription1$!: Subscription;
  subscription2$!: Subscription;
  subscription3$!: Subscription;
  ngOnInit() {
    this.subscription1$ = this._GlobalService
      .availableCurrencies()
      .subscribe((res) => {
        this.availableCurrencies = Object.keys(res.symbols);
      });
    this.subscription2$ = this._GlobalService.currentfromAndToDetails.subscribe(
      (obj) => {
        this.model = obj;
        console.log(obj);
      }
    );
    this.subscription3$ = this._GlobalService.getEURtoUSD().subscribe((res) => {
      console.log(res);

      this.EURtoUSD = res.rates.USD;
      this.convertedAmount = this.EURtoUSD * this.model.amount;
    });
  }

  onSubmit(form: any) {
    console.log(form.value);

    if (form.valid) {
      var { from, to, amount } = form.value;
      this.convertedAmount = this.EURtoUSD * amount;
    }
  }
  backClicked() {
    this._location.back();
  }
  ngOnDestroy() {
    this.subscription1$.unsubscribe();
    this.subscription2$.unsubscribe();
    this.subscription3$.unsubscribe();
  }
}
