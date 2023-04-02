import { Component } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  options: string[] = ['One', 'Two', 'Three'];
  myControl = new FormControl<string | string>('');
  contactForm = new FormGroup({
    title: new FormControl('', Validators.required),
    skill: new FormControl<string | string>('', Validators.required),
    language: new FormControl<string | string>('', Validators.required),
    description: new FormControl('', Validators.required),
  });

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
