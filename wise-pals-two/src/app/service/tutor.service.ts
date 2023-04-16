import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../util/apiEndpoints';

export interface ITutor {
  _id: string;
  userId: string;
  fname: string;
  lname: string;
  image: string;
  description: string;
  spokenLanguages: string[];
  skills: string[];
  hourlyRate: number;
  currency: string;
  classesGiven: number;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class TutorService {
  constructor(private http: HttpClient) {}

  getTutor(id: any) {
    let response = this.http.get<ITutor>(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.GET_TUTOR}${id}`
    );
    console.log('response: ' + response);
    return response;
  }

  getTutorByUser(id: any) {
    let response = this.http.get<ITutor>(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.GET_TUTOR_USER}${id}`
    );
    console.log('response: ' + response);
    return response;
  }
}
