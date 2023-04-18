import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReviewFormComponent } from './review-form/review-form.component';
import { ReviewService } from 'src/app/service/review.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent {
  review: any = {
    tutorId: '',
    reviews: [],
    numReviews: null,
  };

  constructor(
    private _reviewService:ReviewService,
    private route: ActivatedRoute,
    private _dialog: MatDialog) {}

  openReviewForm(){
    const dialogRef = this._dialog.open(ReviewFormComponent);
  }

  ngOnInit(): void {
    const id: any = this.route.snapshot.paramMap.get('id');
    this.getReviews(id);
  }

  getReviews(tutorId:string) {
    this._reviewService.getReviews(tutorId).subscribe({
      next: (data) => {
        this.review = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
