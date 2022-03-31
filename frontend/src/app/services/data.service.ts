import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private resolution = window.innerWidth;
  private resolutionSource = new BehaviorSubject<number>(this.resolution);
  currentResolution = this.resolutionSource.asObservable();

  constructor() {}

  changeResolution(resolution: number) {
    this.resolutionSource.next(resolution);
  }

  listenToWindowWidth() {
    // window.addEventListener('resize', () => {
    //   this.changeResolution(window.innerWidth);
    //   console.log('current window width: ', this.currentResolution);
    // });
    console.log('listen to window width');
  }
}
