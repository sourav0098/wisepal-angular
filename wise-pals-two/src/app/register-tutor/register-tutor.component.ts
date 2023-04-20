import { Component } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TutorService } from '../service/tutor.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export interface Skill {
  name: string;
}

export interface Language {
  name: string;
}

@Component({
  selector: 'app-register-tutor',
  templateUrl: './register-tutor.component.html',
  styleUrls: ['./register-tutor.component.css'],
})
export class RegisterTutorComponent {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  skills: Skill[] = [];
  languages: Language[] = [];

  fname: string | null = sessionStorage.getItem('firstName');
  lname: string | null = sessionStorage.getItem('lastName');
  email: string | null = sessionStorage.getItem('email');
  phone: string | null = sessionStorage.getItem('phone');

  tutorForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _tutorService: TutorService,
    private toastr: ToastrService,
    private router:Router
  ) {
    this.tutorForm = this._fb.group({
      userId: new FormControl(sessionStorage.getItem('id')),
      fname: new FormControl(this.fname, [Validators.required]),
      lname: new FormControl(this.lname, [Validators.required]),
      skills: new FormArray([], [Validators.required]),
      spokenLanguages: new FormArray([], [Validators.required]),
      hourlyRate: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      currency: new FormControl('', [Validators.required]),
      description: new FormControl(),
      image: new FormControl(),
    });
  }

  add(event: MatChipInputEvent, type: string): void {
    const value = (event.value || '').trim();

    if (value) {
      if (type === 'skill') {
        // Add skill
        this.skills.push({ name: value });
      } else if (type === 'language') {
        // Add language
        this.languages.push({ name: value });
      }
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(item: Skill | Language, type: string): void {
    if (type === 'skill') {
      const index = this.skills.indexOf(item as Skill);

      if (index >= 0) {
        this.skills.splice(index, 1);
      }
    } else if (type === 'language') {
      const index = this.languages.indexOf(item as Language);

      if (index >= 0) {
        this.languages.splice(index, 1);
      }
    }
  }

  edit(item: Skill | Language, event: MatChipEditedEvent, type: string) {
    const value = event.value.trim();

    if (!value) {
      // Remove item if it no longer has a name
      this.remove(item, type);
      return;
    }

    if (type === 'skill') {
      // Edit existing skill
      const index = this.skills.indexOf(item as Skill);
      if (index >= 0) {
        this.skills[index].name = value;
      }
    } else if (type === 'language') {
      // Edit existing language
      const index = this.languages.indexOf(item as Language);
      if (index >= 0) {
        this.languages[index].name = value;
      }
    }
  }

  onTutorFormSubmit() {
    const skillsFormArray = this.tutorForm.get('skills') as FormArray;
    skillsFormArray.clear(); // Clear the existing form array

    for (const skill of this.skills) {
      skillsFormArray.push(new FormControl(skill.name)); // Add each skill to the form array
    }

    const languagesFormArray = this.tutorForm.get(
      'spokenLanguages'
    ) as FormArray;
    languagesFormArray.clear(); // Clear the existing form array

    for (const language of this.languages) {
      languagesFormArray.push(new FormControl(language.name)); // Add each language to the form array
    }

    if (this.tutorForm.valid) {
      this._tutorService.addTutor(this.tutorForm.value).subscribe({
        next: (res) => {
          console.log(res)
          this.toastr.success('Tutor added successfully');
          // Get the current session storage value or set an initial value
          let currentValue = sessionStorage.getItem('roles') || '2000';

          // Append ',5777' to the current value
          currentValue += ',5777';

          // Set the updated value in the session storage
          sessionStorage.setItem('roles', currentValue);
          
          this.router.navigateByUrl("/profile");
        },
        error: (err) => {
          this.toastr.error('Error adding tutor');
        },
      });
    } else {
      this.toastr.error('Please fill valid information in the form');
    }
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.tutorForm.patchValue({
        image: file,
      });
    }
  }
}
