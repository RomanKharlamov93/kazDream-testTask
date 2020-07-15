import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import t from './mock/temperature.json'
import p from './mock/precipitation.json'

@Injectable({
  providedIn: 'root',
})
export class MemoizeDataService implements InMemoryDbService {
  createDb() {
    const temperature = t;
    const precipitation = p;
    return {temperature, precipitation};
  }
}
