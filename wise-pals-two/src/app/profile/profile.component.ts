import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ITutor, IUpdateTutor, TutorService } from '../service/tutor.service';
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
  skills: string[] = ['react'];
  languages: string[] = ['spanish'];
  profile: IProfile | undefined;
  tutor: ITutor | undefined;
  tutorForm = new FormGroup({
    cost: new FormControl(0, Validators.required),
    description: new FormControl('', Validators.required),
  });
  id: string = '';
  isTutor: boolean = false;

  constructor(
    private tutorService: TutorService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.isTutor = sessionStorage.getItem('roles')!.includes('5777');
    this.id = sessionStorage.getItem('id')!;
    this.profileService.getProfile(this.id).subscribe((res) => {
      this.profile = res;
    });
    if (this.isTutor) {
      this.tutorService.getTutorByUser(this.id).subscribe((res) => {
        this.tutor = res;
        this.skills = this.tutor.skills;
        this.languages = this.tutor.spokenLanguages;
        this.tutorForm.get('cost')?.setValue(this.tutor.hourlyRate);
        this.tutorForm.get('description')?.setValue(this.tutor.description);
      });
    }
  }

  onSubmit2(form: NgForm) {
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

  onSubmit() {
    let data: IUpdateTutor = {
      id: this.tutor?._id!,
      description: this.tutorForm.value.description!,
      hourlyRate: this.tutorForm.value.cost!,
      skills: this.skills,
      spokenLanguages: this.languages,
    };
    this.tutorService.updateTutor(data).subscribe((res) => {
      Swal.fire({
        title: 'Success!',
        text: 'You have updated you profile',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.skills.push(value);
    }
    event.chipInput!.clear();
  }

  remove(skill: string): void {
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

  removeLanguage(language: string): void {
    const index = this.languages.indexOf(language);
    if (index >= 0) {
      this.languages.splice(index, 1);
    }
  }
}
