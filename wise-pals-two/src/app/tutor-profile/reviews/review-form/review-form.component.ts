import { Component, Inject} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReviewService } from 'src/app/service/review.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css'],
})
export class ReviewFormComponent {
  reviewForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _reviewService: ReviewService,
    private _dialogRef: MatDialogRef<ReviewFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.reviewForm = this._fb.group({
      userId: new FormControl(sessionStorage.getItem('id')),
      tutorId: new FormControl(this.data.tutorId),
      rating:4,
      review: new FormControl('', [Validators.required]),
    });
  }

  onReviewFormSubmit() {
    if (this.reviewForm.valid) {
      this._reviewService.addReview(this.reviewForm.value).subscribe({
        next: () => {
          this._dialogRef.close();
        },
        error: (err) => {
          console.log(err);
        },
      });
      console.log(this.reviewForm.value);
    } else {
    }
  }
}
