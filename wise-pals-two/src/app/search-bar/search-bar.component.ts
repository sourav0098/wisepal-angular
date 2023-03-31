import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from 'src/util/apiEndpoints';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ResultsService } from '../service/result.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  skill: string = '';
  searchResults: any[] = [];

  constructor(
    private resultService: ResultsService, private location: Location,
    private http: HttpClient, private router: Router) { }

  onSearch() {
    this.http.get<any[]>(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.TUTORS}/?skill=${this.skill}`).subscribe(
        (items: any) => {
          this.resultService.setSearchResults(items);
          if (this.location.path() == '') {
            this.router.navigate(['/tutorlist']);

            // Route URL ends with "tutorlist"
          }
        },
        error => {
          console.error('Error loading items:', error);
        }
      );
  }
}
