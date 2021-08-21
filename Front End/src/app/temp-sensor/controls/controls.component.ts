import { Component, OnInit, Input, ViewChild, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { IControls } from '../model/IControls';
import { TempSensorService } from '../services/temp-sensor.service';
import { DeviceControlsService } from '../services/device-controls.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit, AfterViewInit {
  

  isAutoMode: boolean;
  @Input() control: IControls;
  @ViewChild('info') info:ElementRef; 
  constructor(private deviceControlsService: DeviceControlsService,
    private renderer: Renderer2) { }


  ngAfterViewInit(): void {
    this.displayInfo()
  }

  ngOnInit(): void {
   this.isAutoMode = this.control.autoModeEnabled;
   
  }

  toggle(command: string) {
    const iToggle = { name:this.control.name, command: command }
    if(command === "auto"){
   this.isAutoMode = !this.isAutoMode;
   this.displayInfo()
    }else if(this.control.name == "Вентилация"){
      iToggle.command = command+ "_fan"
    }
    
    this.deviceControlsService.controlDevice(iToggle).subscribe(ex => console.log(ex));
  }

  displayInfo(){
 
    if(!this.isAutoMode){
      this.renderer.setStyle(this.info.nativeElement,"visibility", "hidden")
    } else{
      this.renderer.removeStyle(this.info.nativeElement,"visibility")
    }
  }


}
