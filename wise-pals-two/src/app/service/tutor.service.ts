import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from 'src/util/apiEndpoints';

@Injectable({
  providedIn: 'root',
})
export class TutorService {
  constructor(private _http: HttpClient) {}

  getTutor(id: string): Observable<any> {
    return this._http.get(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.TUTORS}/${id}`
    );
  }
}
