import { Component } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';


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
}
