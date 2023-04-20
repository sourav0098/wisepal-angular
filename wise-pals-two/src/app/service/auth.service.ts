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

  loginUser(email:any,password:any){

    let response = this.http.post(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.LOGIN}`,
    {
      email,
      password
    }
    )
    return response;
  }

  isloggedin(){
    return sessionStorage.getItem('email')!=null;
  }

  getrole(){
    return sessionStorage.getItem('roles')!=null?sessionStorage.getItem('roles')?.toString():'';
  }

}
