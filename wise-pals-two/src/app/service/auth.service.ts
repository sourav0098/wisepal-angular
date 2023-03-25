import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../util/apiEndpoints';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { 

  }
  RegisterUser(inputdata:any){
    return this.http.post(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.REGISTER}`,inputdata)
  }

  GetUserbyCode(id:any){
    return this.http.post(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.REGISTER}`,id)
  }


}
