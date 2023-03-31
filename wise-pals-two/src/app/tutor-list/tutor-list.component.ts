import { Component } from '@angular/core';
import { ResultsService } from '../service/result.service';
import { API_ENDPOINTS } from 'src/util/apiEndpoints';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.component.css']
})
export class TutorListComponent {
  searchResults: any[] = [];
  skill: string = '';

  baseUrl = API_ENDPOINTS.BASE_URL;
  images = API_ENDPOINTS.IMAGES
  constructor(private searchResultsService: ResultsService, private http: HttpClient) { }

  ngOnInit(): void {
    this.searchResults = this.searchResultsService.getSearchResults(); // retrieve search results from service
    console.log(this.searchResults)
  }
  onSearch() {
    this.http.get<any[]>(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.TUTORS}/?skill=${this.skill}`).subscribe(
        (items: any) => {
          this.searchResults = items;
        },
        error => {
          console.error('Error loading items:', error);
        }
      );
  }
}
