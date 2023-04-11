import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TutorService } from '../service/tutor.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  skills: string[] = [];
  languages: string[] = [];
  myControl = new FormControl<string | string>('');
  contactForm = new FormGroup({
    title: new FormControl('', Validators.required),
    skill: new FormControl<string | string>('', Validators.required),
    language: new FormControl<string | string>('', Validators.required),
    description: new FormControl('', Validators.required),
  });
  tutorId: string = '';

  constructor(
    private route: ActivatedRoute,
    private tutorService: TutorService
  ) {}

  ngOnInit() {
    this.tutorId = this.route.snapshot.params['id'];
    this.tutorService.getTutor(this.tutorId).subscribe((data) => {
      this.languages = data.spokenLanguages;
      this.skills = data.skills;

      console.log(this.languages);
    });
  }

  displayFn(option: string): string {
    return option;
  }

  onSubmit() {
    console.log(this.contactForm.value.title);
    console.log(this.contactForm.value.skill);
    console.log(this.contactForm.value.language);
    console.log(this.contactForm.value.description);
  }
}
