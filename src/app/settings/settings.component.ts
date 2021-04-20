import { Component, OnInit } from '@angular/core';
import { WeatherTodayService } from '../weather-today.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public cities=[];
  public isClick=true;
  public cityCode;
  public city;
  public unit;

  constructor(private myService:WeatherTodayService) { }

  public setCity(city){
    this.myService.setCityList(city);
  }
  /*
  public getNewCity(){
    this.cities=this.myService.getCityList();
    console.log(this.cities);
  }*/

  selectChangeHandler(event) {
    this.cityCode = event.target.value;
    this.myService.deleteCity(this.cityCode);
  }

  selectChangeHandler2(event) {
    this.city = event.target.value;
    this.myService.setDefaultCity(this.city);
  }

  selectChangeRadio(event) {
    this.unit = event.target.value;
    this.myService.setUnit(this.unit);
  }  

  ngOnInit(): void {
    this.cities=this.myService.getCityList();
  }

}
