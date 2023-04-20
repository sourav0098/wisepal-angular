import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../util/apiEndpoints';

export interface IContact {
  description: string;
  language: string;
  skill: string;
  title: string;
  tutor: string;
  user: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  contact(data: IContact) {
    let response = this.http.post(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.CONTACT}`,
      data
    );
    return response;
  }
}
