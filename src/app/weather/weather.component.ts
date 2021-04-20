import { Component, OnInit } from '@angular/core';
import { WeatherTodayService } from '../weather-today.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  public set=0;
  public cities=[];
  public lat;
  public lon;
  public currentWeather;
  public cityWeather;
  public nextCityWeather=[];
  public nextCurrentCityWeather=[];
  public selectedCity="";
  public defaultCity="";
  constructor(private myService:WeatherTodayService) { }

  /*public getCity(){
    this.cities=this.myService.getCityList();
    console.log(this.cities);
  }*/

  selectChangeHandler(event) {
    this.selectedCity = event.target.value;
    this.set=1;
    this.myService.getWeather(this.selectedCity).subscribe(data => {this.cityWeather=data});
    this.myService.getNextFewDays(this.selectedCity).subscribe(data => {this.nextCityWeather=data.list});
  }
   
  ngOnInit(): void {
    if(this.set==0)
    {  
      this.getLocation();
      this.cities=this.myService.getCityList();
    }
    this.defaultCity=this.myService.getDefaultCity();
    if(this.defaultCity.length>0){
        this.myService.getWeather(this.defaultCity).subscribe(data => {this.currentWeather=data});
        this.myService.getNextFewDays(this.defaultCity).subscribe(data => {this.nextCurrentCityWeather=data.list});
        this.cities=this.myService.getCityList();
    }
    else{
        this.getLocation();
        this.cities=this.myService.getCityList();
    }
  }

  getLocation()
  {
   if('geolocation' in navigator)
   {
     navigator.geolocation.watchPosition((success)=>
     {
       this.lat=success.coords.latitude;
       this.lon =success.coords.longitude;
       this.myService.getCurrentWeather(this.lat,this.lon).subscribe(data => {this.currentWeather=data});
       this.myService.getCurrentNextFewDays(this.lat,this.lon).subscribe(data => {this.nextCurrentCityWeather=data.list});
     })
   }
 }
  
}
