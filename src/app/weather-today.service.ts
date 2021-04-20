import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherTodayService {
  
  constructor(private http : HttpClient) { }

  public cities=[];
  public count=0;
  public val;
  public defaultCity;
  public unit;

  public setCityList(city){
    this.count=parseInt(localStorage.getItem("count"));
    localStorage.setItem(`${this.count}`,city);
    this.count+=1;
    localStorage.setItem("count",JSON.stringify(this.count));
    this.getCityList();
  }

  public getCityList(){
    this.count=parseInt(localStorage.getItem("count"));
    for (let i = 0; i < this.count; i++) {
      this.cities[i]=localStorage.getItem(`${i}`);
    }
    console.log(this.cities);
    return this.cities;
  }

  public setDefaultCity(city){
    this.defaultCity=city;
  }

  public getDefaultCity(){
    return this.defaultCity;
  }
 
  public setUnit(unt){
    localStorage.setItem("unit",unt);
  }

  public deleteCity(cityCode){
    localStorage.removeItem(cityCode);
    this.count=parseInt(localStorage.getItem("count"));
    this.val=localStorage.getItem(JSON.stringify(this.count-1));
    localStorage.setItem(cityCode,this.val);
    this.count-=1;
    localStorage.setItem("count",JSON.stringify(this.count));
    this.cities.length-=1;
    this.getCityList();
  }


  getWeather(city) : Observable<any>{
    this.unit=localStorage.getItem("unit");
    if(this.unit=="metric"){
      return this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=55f1819a7019b27b0bac5a78879f204d&units=metric`);
    }else{
      return this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=55f1819a7019b27b0bac5a78879f204d&units=imperial`);
    }  
  }

  getCurrentWeather(lat,lon) : Observable<any>{
    this.unit=localStorage.getItem("unit");
    if(this.unit=="metric"){
      return this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=55f1819a7019b27b0bac5a78879f204d&units=metric`);
    }else{
      return this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=55f1819a7019b27b0bac5a78879f204d&units=imperial`);
    }
  }

  getNextFewDays(city) : Observable<any>{
    this.unit=localStorage.getItem("unit");
    if(this.unit=="metric"){
      return this.http.get<any>(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=55f1819a7019b27b0bac5a78879f204d&units=metric`);
    }else{
      return this.http.get<any>(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=55f1819a7019b27b0bac5a78879f204d&units=imperial`);
    }    
  }

  getCurrentNextFewDays(lat,lon) : Observable<any>{
    this.unit=localStorage.getItem("unit");
    if(this.unit=="metric"){
      return this.http.get<any>(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=55f1819a7019b27b0bac5a78879f204d&units=metric`);
    }else{
      return this.http.get<any>(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=55f1819a7019b27b0bac5a78879f204d&units=imperial`);
    }
  }


}
