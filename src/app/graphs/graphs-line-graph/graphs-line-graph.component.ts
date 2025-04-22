import { Component, OnInit, Input } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType, ChartEvent } from "chart.js";

@Component({
  selector: 'app-graphs-line-graph',
  templateUrl: './graphs-line-graph.component.html',
  styleUrls: ['./graphs-line-graph.component.css']
})

export class GraphsLineGraphComponent implements OnInit {
  @Input() labels: any;
  @Input() graphData: any;
  
  showChart = false;
  public graphLables: string[] = [];
  public graphDatas: any[] = [];

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.graphLables,
    datasets: [
      {
        data: this.graphDatas,
        label: 'Marks',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };

  public lineChartLegend = true;

  ngOnInit(): void {
    for (var i = 0; i < this.labels.length; i++) { 
      this.graphLables.push(this.labels[i]);
    }
    for (var i = 0; i < this.graphData.length; i++) { 
      this.graphDatas.push(this.graphData[i]);
    }
    this.showChart = true;
  }
}