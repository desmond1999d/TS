import {Component, OnInit} from '@angular/core';
import {ContactsConstants} from '../../../shared/ContactsConstants';

@Component({
  selector: 'app-contacts-header',
  templateUrl: './contacts-header.component.html',
  styleUrls: ['./contacts-header.component.css']
})
export class ContactsHeaderComponent implements OnInit {

  public contactsConstants: ContactsConstants;

  constructor() {
    this.contactsConstants = new ContactsConstants();
  }

  ngOnInit() {
  }

}
