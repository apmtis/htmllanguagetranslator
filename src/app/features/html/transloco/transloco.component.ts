import { AddLanguageComponent } from './../../../add-language/add-language.component';
import { Component, OnInit } from '@angular/core';
import { HtmlService } from 'src/app/html.service';
import * as ModuleEnglishAPSJson from '../../../../../aps/en.json';
import * as ModuleSpanishAPSJson from '../../../../../aps/es.json';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-transloco',
  templateUrl: './transloco.component.html',
  styleUrls: ['./transloco.component.css'],
})
export class TranslocoComponent implements OnInit {
  constructor(public htmlSer: HtmlService, public dialog: MatDialog) {}

  ngOnInit(): void {}

  getEnglishJsonData(item: string) {
    var sliceddata = item.slice(12, item.length - 4);
    var data = _.result(ModuleEnglishAPSJson, sliceddata);
    return data;
  }

  getSpanishJsonData(item: string) {
    var sliceddata = item.slice(12, item.length - 4);
    var data = _.result(ModuleSpanishAPSJson, sliceddata);
    return data;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddLanguageComponent, {
      width: '250px',
      data: ModuleEnglishAPSJson,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');

      //this. = result;
    });
  }
}
