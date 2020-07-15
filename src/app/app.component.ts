
import { Component, OnInit } from '@angular/core';
import { TemperatureService } from './temperature.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'kd-task';

  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  barChartLabels: any[];
  barChartType = 'line';
  barChartLegend = true;
  barChartData = [
    { data: [], label: 'Temperature' },
    { data: [], label: 'Precipitation' },
  ];

  temperatures: any;
  precipitation: any;

  startYear: string;
  endYear: string;

  constructor(private t: TemperatureService) {}

  ngOnInit() {
    this.getAllTemperatures();
    this.getAllPrecipitation()
  }

  getAllTemperatures(start?, end?) {
    this.t.getAllTemperatures().subscribe((res) => {
      this.temperatures = res;
      this.barChartLabels = this.temperatures.map((item) => item.t);
      this.barChartData[0]['data'] = this.temperatures.map((item) => item.v);
      if (start && end) {
        let yearList = _.range(+start, +end + 1);
        this.barChartLabels = this.barChartLabels.filter((year) =>
            yearList.includes(+year.slice(0, 4))
        );
        this.barChartData[0]['data'] = this.temperatures
            .filter(({ t }) => yearList.includes(+t.slice(0, 4)))
            .map((item) => item.v);
      }
    });
  }

  getAllPrecipitation(start?, end?) {
    this.t.getAllPrecipitation().subscribe((res) => {
      this.precipitation = res;
      this.barChartLabels = this.precipitation.map((item) => item.t);
      this.barChartData[1]['data'] = this.precipitation.map((item) => item.v);
      if (start && end) {
        let yearList = _.range(+start, +end + 1);
        this.barChartLabels = this.barChartLabels.filter((year) =>
            yearList.includes(+year.slice(0, 4))
        );
        this.barChartData[1]['data'] = this.precipitation
            .filter(({ t }) => yearList.includes(+t.slice(0, 4)))
            .map((item) => item.v);
      }
    });
  }

  getAll(start, end) {
    this.getAllTemperatures(start, end);
    this.getAllPrecipitation(start, end)
  }
}
