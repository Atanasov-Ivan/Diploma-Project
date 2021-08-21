import { Component, OnInit, ViewChild, OnDestroy, AfterContentInit, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { TempSensorService } from './services/temp-sensor.service';
import { ITempSensor } from './model/ITempSensor';
import { Subscription, Observable } from 'rxjs';
import { GoogleChartComponent } from 'angular-google-charts';
import { IControls } from './model/IControls';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CatalogService } from './services/catalog.service';
import { IProductResponse } from './model/IProductResponse';
import { DeviceControlsService } from './services/device-controls.service';

@Component({
  selector: 'app-temp-sensor',
  templateUrl: './temp-sensor.component.html',
  styleUrls: ['./temp-sensor.component.css']
})
export class TempSensorComponent implements OnInit, AfterContentInit, OnDestroy, AfterViewInit {
  private subscription: any;

  tempSensor: ITempSensor;
  interval: any;
  controls: IControls[]
  product: IProductResponse;
  private limits = {
    minTemp: 20,
    maxTemp: 25,
    moisture: 25,
    humidity: 25
  }


  @ViewChild('temp', {static: true}) tempMessageBox: ElementRef;
  @ViewChild('humidity', {static: true}) humidityMessageBox: ElementRef;
  @ViewChild('dirt', {static: true}) dirtMessageBox: ElementRef;
  @ViewChild('gas', {static: true}) gasMessageBox: ElementRef;

  showTempDanger: boolean

  @ViewChild('tempChart')
  tempChart: GoogleChartComponent;
  tempChat = {
    title: 'Temperature',
    type: 'Gauge',
    data: [
      ['Temperature', 25]
    ],
    options: {
      width: 550,
      height: 220,
      greenFrom: 20,
      greenTo: 30,
      redFrom: 42,
      redTo: 50,
      yellowFrom: 30,
      yellowTo: 42,
      minorTicks: 10,
      min: 0,
      max: 50
    }
  };



  @ViewChild('humidityChart')
  humidityChart: GoogleChartComponent;
  humChart = {
    title: 'Temperature',
    type: 'Gauge',
    data: [
      ['Humidity', 50]
    ],
    options: {
      width: 550,
      height: 220,
      greenFrom: 0,
      greenTo: 55,
      redFrom: 80,
      redTo: 100,
      yellowFrom: 55,
      yellowTo: 80,
      minorTicks: 10
    }
  };

  @ViewChild('dirtChar')
  dirtChar: GoogleChartComponent;
  dirtChart = {
    title: 'Moisture(%)',
    type: 'Gauge',
    data: [
      ['Moisture(%)', 25]
    ],
    options: {
      width: 550,
      height: 220,

      greenFrom: 35,
      greenTo: 65,
      minorTicks: 10,
      min: 0,
      max: 100,
      animation: {
        easing: "out"
      }
    }
  };

  @ViewChild('gasChar')
  gasChar: GoogleChartComponent;
  gasChart = {
    title: 'Gas',
    type: 'Gauge',
    data: [
      ['Gas(%)', 25]
    ],
    options: {
      width: 550,
      height: 220,
      greenFrom: 0,
      greenTo: 25,
      yellowFrom: 25,
      yellowTo: 40,
      redFrom: 40,
      redTo: 100,
      minorTicks: 10,
      min: 0,
      max: 100
    }
  };

  constructor(private tempSensorService: TempSensorService,
    private controlService: DeviceControlsService,
    private route: ActivatedRoute,
    private catalogService: CatalogService,
    private renderer: Renderer2) { }



  ngAfterViewInit(): void {
    this.hideAllWindows();
    this.getProduct();

    this.controlService.getAllDevices().subscribe(x => this.controls = x)

    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 2000);
  }





  ngOnInit() {


  }

  setGaugesLimits() {
    this.limits.minTemp = this.product.minTemp;
    this.limits.maxTemp = this.product.maxTemp;
    this.limits.humidity = this.product.airHumidity;
    this.limits.moisture = this.product.groundHumidity;
   
    
  }

  ngAfterContentInit(): void {
    const mainContainer = <HTMLElement>document.getElementsByClassName("main-container")[0]
    mainContainer.style["background"] = "url('/assets/images/partial-background.png') repeat center center fixed"
    mainContainer.style["background-size"] = "100% 100%"
  }

  ngOnDestroy(): void {


    this.interval = null
    const mainContainer = <HTMLElement>document.getElementsByClassName("main-container")[0]
    mainContainer.style["background"] = "url('/assets/images/garden-background.png') repeat center center fixed"
    mainContainer.style["background-size"] = "100% 100%"
  }

  getProduct() {
    let productName = this.route.snapshot.params['productName']
    if (productName != null) {
      this.catalogService.getProductByName(productName).subscribe(data => { this.product = data },
        err => console.error(err),
        () => this.setGaugesLimits());
    }

  }

  refreshData() {

    this.tempSensorService.fetchLatestTempSensor()
      .subscribe(data => {
        data.dirt = 100 - ((data.dirt / 4095) * 100)
        data.gas = ((data.gas / 4095) * 100)
        this.displayMessagesIfCriticalValues(data);
        console.log(data)
        this.humChart.data = [
          ["Влж. въз(%)", data.humidity]
        ]
        this.tempChat.data = [
          ['Темп °C', data.temperature]
        ];
        this.gasChart.data = [
          ['Газове(%)', Math.round(data.gas * 10) / 10]
        ];
        this.dirtChart.data = [
          ['Влж. поч(%)', 32.1]
        ];
        this.tempSensor = data;
      });
  }




  displayMessagesIfCriticalValues(data: ITempSensor) {
    this.displayHighHumidityWarnings(Number(data.humidity))
    this.displayTempWarnings(Number(data.temperature));
    this.displayHighMoistureWarnings(Number(data.dirt))
    this.displayHighGasWarnings(Number(data.gas))
  }

  private displayHighHumidityWarnings(humidity: number) {
    if (humidity >= 85) {
      this.setAlertMessage(this.humidityMessageBox, `<strong>Опастност !</strong><br> Влажноста на въздуха е в опасни стойности.`, "#fc2003")

    } else if (humidity >= 55) {
      this.setAlertMessage(this.humidityMessageBox, "<strong>Внимание!</strong><br> Влажността на въздуха се покачва", "orange")
    }
    else {
      this.renderer.setStyle(this.humidityMessageBox.nativeElement, "visibility", "hidden")
    }
  }

  private displayHighGasWarnings(gas: number) {
   
    if (gas >= 40) {
      this.setAlertMessage(this.gasMessageBox, "<strong>Опастност!</strong><br> Вредните газове са в опасни стойности", "#fc2003")

    } else if (gas >= 25) {
      this.setAlertMessage(this.gasMessageBox, "<strong>Внимание!</strong><br> Вредните газове се покачват", "orange")
    }
    else {
      this.renderer.setStyle(this.gasMessageBox.nativeElement, "visibility", "hidden")
    }
  }

  private displayHighMoistureWarnings(moisture: number) {
    if (moisture < 35 ) {
      this.setAlertMessage(this.dirtMessageBox, "<strong>Внимание!</strong><br> Влагата в почвата е намалена", "orange")
    } else if( moisture> 65){
      this.setAlertMessage(this.dirtMessageBox, "<strong>Внимание!</strong><br> Влагата в почвата е повишена", "orange")
    }
    else {
      this.renderer.setStyle(this.dirtMessageBox.nativeElement, "visibility", "hidden")

    }
  }

  private displayTempWarnings(temp: number) {
    if (temp >= this.limits.maxTemp) {
      this.setAlertMessage(this.tempMessageBox, `<strong>Опасност!</strong><br> Температурата е достигнала критични стойности ! `, "#fc2003")

    } else if (temp <= this.limits.minTemp) {
      this.setAlertMessage(this.tempMessageBox, `<strong>Внимание!</strong><br> Температурата е с понижени.`, "orange")
    }
    else {
      this.renderer.setStyle(this.tempMessageBox.nativeElement, "visibility", "hidden")
    }
  }

  private hideAllWindows() {
    this.renderer.setStyle(this.humidityMessageBox.nativeElement, "visibility", "hidden")
    this.renderer.setStyle(this.tempMessageBox.nativeElement, "visibility", "hidden")
    this.renderer.setStyle(this.dirtMessageBox.nativeElement, "visibility", "hidden")
    this.renderer.setStyle(this.gasMessageBox.nativeElement, "visibility", "hidden")

  }

  setAlertMessage(el: ElementRef, message: string, color: string){
    this.renderer.removeStyle(el.nativeElement, "visibility")
    this.renderer.setProperty(el.nativeElement, 'innerHTML', message)
    this.renderer.setStyle(el.nativeElement, "backgroundColor", color)
  }


}
