import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../util/apiEndpoints';
import { Observable } from 'rxjs';

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

export interface IUpdateTutor {
  id: string;
  description: string;
  hourlyRate: number;
  skills: string[];
  spokenLanguages: string[];
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
    return response;
  }

  addTutor(data: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');

    const options = {
      headers: headers
    };

    const url = `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.TUTORS}`;
    return this.http.post(url, data, options);
  }

  getTutorByUser(id: any) {
    let response = this.http.get<ITutor>(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.GET_TUTOR_USER}${id}`
    );
    return response;
  }

  updateTutor(data: IUpdateTutor) {
    let response = this.http.put(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.TUTORS}`,
      data
    );
    return response;
  }
}
