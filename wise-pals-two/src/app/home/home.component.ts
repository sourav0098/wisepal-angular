import { Component, OnInit } from '@angular/core';
import { API_ENDPOINTS } from '../../util/apiEndpoints';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  result: any;
  content= ''

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.CONTENTS}/63e7a5d14236e852403de3c6`)
      .subscribe(item => {
        this.result = item;
        console.log('response: ', this.result);
        this.content = this.result.data.description;
      });
  }
  
}
