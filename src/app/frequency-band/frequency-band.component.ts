import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import * as io from 'socket.io-client';
import { ChartService, Constants } from '../shared';
import { CHART_DIRECTIVES } from '../shared/ng2-charts';

@Component({
  moduleId: module.id,
  selector: 'bci-frequency-band',
  templateUrl: 'frequency-band.component.html',
  styleUrls: ['frequency-band.component.css'],
  directives: [CHART_DIRECTIVES],
  providers: [ChartService, Constants]
})

export class FrequencyBandComponent implements OnInit, OnDestroy {

  socket: any;

  constructor(private chartService: ChartService, 
              private constants: Constants) {
    this.socket = io(constants.socket.url);
  }
  
  @Input() public type:string;
  @Input() public band:string;
  @Input() public color:number;
  
  private data:Array<any> = [{ data: [], label: [] }];
  private colors = this.chartService.getColorByIndex(this.color);
  private channels = this.chartService.getChannels();
  private options = this.chartService.getChartJSBarDefaults();
  
  ngOnInit() {
    this.colors = this.chartService.getColorByIndex(this.color);
    this.socket.on(this.constants.socket.events.fft, (data) => {
      this.data = [];
      data[this.band || 'data'].forEach((dataset, index) => {
        this.data.push({
          data: dataset
        });
      });
    });
  }
  
  ngOnDestroy () {
    this.socket.removeListener(
      this.constants.socket.events.fft
    );
  } 

}
