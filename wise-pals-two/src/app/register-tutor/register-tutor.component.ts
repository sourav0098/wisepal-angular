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

  tutorForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.tutorForm = this._fb.group({
      skills: new FormArray([], [Validators.required]),
      languages: new FormArray([], [Validators.required]),
      hourlyCost: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      currency: new FormControl('',[
        Validators.required
      ]),
      description: new FormControl(),
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

    const languagesFormArray = this.tutorForm.get('languages') as FormArray;
    languagesFormArray.clear(); // Clear the existing form array

    for (const language of this.languages) {
      languagesFormArray.push(new FormControl(language.name)); // Add each language to the form array
    }

    if (this.tutorForm.valid) {
      console.log(this.tutorForm.value);
    } else {
      console.log("Invalid form");
    }
  }
}
