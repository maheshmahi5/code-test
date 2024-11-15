import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-weather-view',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './weather-view.component.html',
  styleUrl: './weather-view.component.scss'
})
export class WeatherViewComponent {

  searchInput: string = '';

  weatherData: Record<string, any>[] = [];

  spinner: boolean = false;

  constructor( public http: HttpClient) { }

  ngOnInit(): void {
  }

  getWeatherData() {
    if(this.searchInput) {
        // i kept lat and long values as static because i need to call geocoding api to get values using body 
        // those static values are related to city visakhapatnam
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${17.68}&lon=${83.21}&appid=${'1635890035cbba097fd5c26c8ea672a1'}`
      this.weatherData = [];
      //setting true to load while api hitting
      this.spinner = true
      this.http.get<any>(url).subscribe(response => {
        console.log(response)
        if(response.list.length) {
          let currentDate = '';
          response.list.forEach((report: any) => {
            let reportDate = new Date(report.dt_txt).toLocaleDateString();
            report['local_date'] = reportDate
            if(reportDate !== currentDate) {
              this.weatherData.push(report)
            }
            currentDate = reportDate
          })
          console.log(this.weatherData ,'weather data')
        }

      },(error) =>{
        
      })
      this.spinner = false
    }
  }

  onSearchData() {
    this.getWeatherData()
  }
}

