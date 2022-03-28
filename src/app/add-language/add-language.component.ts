import { HtmlService } from './../html.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { googlelanguages } from './languages';

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrls: ['./add-language.component.css'],
})
export class AddLanguageComponent implements OnInit {
  languages: any;
  constructor(
    public dialogRef: MatDialogRef<AddLanguageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public htmlSer: HtmlService
  ) {
    this.languages = googlelanguages;
    console.log(data);
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  generateJson() {}
}
