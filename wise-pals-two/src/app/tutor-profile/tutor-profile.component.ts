import { Component } from '@angular/core';
import { TutorService } from '../service/tutor.service';
import { ActivatedRoute } from '@angular/router';
import { API_ENDPOINTS } from 'src/util/apiEndpoints';

@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.css'],
})
export class TutorProfileComponent {
  tutor: any = {
    fname: '',
    lname: '',
    image: '',
    description: '',
    spokenLanguages: [],
    skills: [],
    hourlyRate: null,
    classesGiven: null,
  };
  image: any;

  constructor(
    private _tutorService: TutorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id: any = this.route.snapshot.paramMap.get('id');
    this.getTutor(id);
  }

  getTutor(id: string) {
    this._tutorService.getTutor(id).subscribe({
      next: (data) => {
        this.tutor = data;
        this.image = `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.IMAGES}/${data.image}`;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
