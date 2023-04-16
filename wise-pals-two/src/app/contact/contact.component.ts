import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TutorService } from '../service/tutor.service';
import { ContactService, IContact } from '../service/contact.service';
import Swal from 'sweetalert2';

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
    private tutorService: TutorService,
    private contactService: ContactService
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
    let data: IContact = {
      description: this.contactForm.value.description!,
      language: this.contactForm.value.language!,
      skill: this.contactForm.value.skill!,
      title: this.contactForm.value.title!,
      tutor: this.tutorId,
      user: '640b6fb90eafd4f1c758d245',
    };
    this.contactService.contact(data).subscribe((res) => {
      this.contactForm.reset();
      this.contactForm.controls['title'].setErrors(null);
      this.contactForm.controls['description'].setErrors(null);
      this.contactForm.controls['language'].setErrors(null);
      this.contactForm.controls['skill'].setErrors(null);
      this.contactForm.validator;
      Swal.fire({
        title: 'Success!',
        text: 'You have contacted the tutor',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
    });
  }
}
