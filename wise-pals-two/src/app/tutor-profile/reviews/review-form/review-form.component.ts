import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent {

  reviewForm:FormGroup;

  constructor(private _fb: FormBuilder) {
    this.reviewForm = this._fb.group({
      review: new FormControl('',[
        Validators.required,
      ]),
    });
  }

  onReviewFormSubmit() {
    console.log(this.reviewForm.value);
  }

}