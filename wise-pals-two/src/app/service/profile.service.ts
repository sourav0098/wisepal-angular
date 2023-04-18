import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../util/apiEndpoints';

export interface IProfile {
  roles: Roles;
  name: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface IUpdateProfile {
  name: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Roles {
  User: number;
  Tutor: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(id: any) {
    let response = this.http.get<IProfile>(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.GET_PROFILE}${id}`
    );
    console.log('response: ' + response);
    return response;
  }

  updateProfile(data: IUpdateProfile) {
    let response = this.http.put(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.UPDATE_PROFILE}`,
      data
    );
    console.log('response: ', response);
    return response;
  }
}
