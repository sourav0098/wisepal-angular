import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from 'src/util/apiEndpoints';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private _http: HttpClient) {}

  getReviews(id:string) {
    return this._http.get(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.REVIEWS}/tutor/${id}`);
  }

  addReview(data:any) {
    return this._http.post(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.REVIEWS}`, data);
  }
}
