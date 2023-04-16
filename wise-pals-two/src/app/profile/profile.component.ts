import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ITutor, TutorService } from '../service/tutor.service';
import {
  IProfile,
  IUpdateProfile,
  ProfileService,
} from '../service/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  skills: String[] = ['react'];
  languages: String[] = ['spanish'];
  profile: IProfile | undefined;
  tutor: ITutor | undefined;
  tutorForm = new FormGroup({
    cost: new FormControl(0, Validators.required),
    description: new FormControl('', Validators.required),
  });
  id: string = '';

  constructor(
    private tutorService: TutorService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.id = '640b6fb90eafd4f1c758d245';
    this.profileService.getProfile(this.id).subscribe((res) => {
      this.profile = res;
    });
    this.tutorService.getTutorByUser(this.id).subscribe((res) => {
      this.tutor = res;
      console.log(this.tutor);
      this.skills = this.tutor.skills;
      this.languages = this.tutor.spokenLanguages;
      this.tutorForm.get('cost')?.setValue(this.tutor.hourlyRate);
      this.tutorForm.get('description')?.setValue(this.tutor.description);
    });
  }

  onSubmit2(form: NgForm) {
    console.log(form.value.name);
    console.log(form.value.lastName);
    console.log(this.profile?.email);
    console.log(form.value.phone);
    let data: IUpdateProfile = {
      name: form.value.name,
      lastName: form.value.lastName,
      email: this.profile?.email!,
      phone: form.value.phone,
    };
    this.profileService.updateProfile(data).subscribe((res) => {
      Swal.fire({
        title: 'Success!',
        text: 'You have updated you profile',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
    });
  }

  onSubmit() {}

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.skills.push(value);
    }
    event.chipInput!.clear();
  }

  remove(skill: String): void {
    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }
  addLanguage(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.languages.push(value);
    }
    event.chipInput!.clear();
  }

  removeLanguage(language: String): void {
    const index = this.languages.indexOf(language);
    if (index >= 0) {
      this.languages.splice(index, 1);
    }
  }
}
