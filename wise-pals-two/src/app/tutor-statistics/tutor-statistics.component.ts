import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart, ChartType, registerables } from 'chart.js';
import { API_ENDPOINTS } from '../../util/apiEndpoints';

@Component({
  selector: 'app-tutor-statistics',
  templateUrl: './tutor-statistics.component.html',
  styleUrls: ['./tutor-statistics.component.css']
})
export class TutorStatisticsComponent implements OnInit {
  totalContacts?: number;
  contactStat: any[] = [];
  skills?: string[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    Chart.register(...registerables);
    let id = sessionStorage.getItem('id');
    console.log("id", id)
    this.http.get<any>(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.CONTACTS}${API_ENDPOINTS.STATISTICS}/${id}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        })
      }
    ).subscribe(res => {
      console.log(res)
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let sum = 0;

      const contactStatsByDayOfWeek = daysOfWeek.map((dayOfWeek) => {
        const count = res.contactsByDayOfWeek[dayOfWeek] || 0;
        sum = count + sum;
        return { day: dayOfWeek.toLowerCase(), contacts: count };
      });

      this.contactStat = contactStatsByDayOfWeek;
      this.totalContacts = sum;
      this.skills = Array.from(new Set(res.skills));

    });

  }

  options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tutor Contact Statistics by Day of the Week for Current Week",
      },
    },
  };
  chartData() {
    return [
      { data: this.contactStat.map((contact: any) => contact.contacts), label: 'Students' }
    ];
  }

  chartLabels() {
    return this.contactStat.map((contact: any) => contact.day);
  }
  barChartType: ChartType = 'bar';

  barChartLegend = true;

  barChartPlugins = [];

}
