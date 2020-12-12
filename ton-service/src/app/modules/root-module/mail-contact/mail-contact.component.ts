import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ContactUsService} from "../../../services/ContactUsService";

@Component({
  selector: 'app-mail-contact',
  templateUrl: './mail-contact.component.html',
  styleUrls: ['./mail-contact.component.css']
})
// TODO: change custom file input outline color
export class MailContactComponent implements OnInit {

  contactForm: FormGroup;
  fileLabel = 'Приложите файл';
  file = null;

  constructor(private formBuilder: FormBuilder, private contactUsService: ContactUsService) {
    this.contactForm = this.formBuilder.group({
      name: '',
      email: '',
      content: '',
      file: null
    });
  }

  ngOnInit() {
  }

  onSubmit(contactData) {
    this.contactUsService.sendContactUsRequest(
      this.contactForm.value.name,
      this.contactForm.value.email,
      this.contactForm.value.content,
      this.file
    ).subscribe(response => {
      alert(response);
    });
    this.contactForm.reset();
    this.file = null;
    this.fileLabel = 'Приложите файл';
  }

  uploadFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileLabel = file.name;
      this.file = file;
    }
  }
}
