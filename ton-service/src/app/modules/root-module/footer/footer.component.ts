import {Component, OnInit} from '@angular/core';
import {DemesneService} from "../../../services/DemesneService";
import {Demesne} from "../../../shared/Demesne";
import {ContactsConstants} from "../../../shared/ContactsConstants";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public demesnes: Demesne[];

  constructor(private demesneService: DemesneService, public contactsConstants: ContactsConstants) {
  }

  ngOnInit() {
    this.demesneService.getAllDemesnes().subscribe(demesnes => {
      this.demesnes = demesnes;
      this.demesnes.sort((a, b) => {
        if (a.name === 'Антикоррозийная обработка автомобилей') {
          return 1;
        } else if (b.name === 'Антикоррозийная обработка автомобилей') {
          return -1;
        }
        return a.id - b.id;
      })
    });
  }

}
