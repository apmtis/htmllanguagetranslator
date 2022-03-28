import { LanguageComponent } from './../language/language.component';
import { HtmlService } from './../../../html.service';
import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { language } from '../../../../environments/environment';
import * as _ from 'lodash';
import * as ModuleEnglishAPSJson from '../../../../../aps/en.json';
import * as ModuleSpanishAPSJson from '../../../../../aps/es.json';

@Component({
  selector: 'app-convertable',
  templateUrl: './convertable.component.html',
  styleUrls: ['./convertable.component.css'],
})
export class ConvertableComponent implements OnInit {
  keyCode = '*transloco="let trsl;"';

  @ViewChild(MatAccordion) accordion: MatAccordion;

  @ViewChildren(LanguageComponent) lang: QueryList<any>;
  displayedColumns: string[] = [
    'Content',
    'Label',
    'English',
    'Spanish',
    'Update',
  ];
  language: any;
  languageContent: any = {};

  constructor(public htmlSer: HtmlService) {
    this.language = language.languageSupported;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.lang.forEach((x) => console.log(x));
  }
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

  updateHtmlJson(htmlDetail: any, htmlPresent: string, jsonKey: string) {
    try {
      let htmlJsonKeyForHtml = htmlDetail.key.slice(
        0,
        htmlDetail.key.length - 5
      );

      console.log(htmlJsonKeyForHtml);
      let jsonKeyUpdateforHtml = `{{trsl('${htmlJsonKeyForHtml}.${jsonKey}')}}`;
      console.log('jsonKey' + jsonKeyUpdateforHtml);
      console.log(htmlDetail.value.path);
      console.log(htmlPresent);
      this.htmlSer
        .updateHtmlContent(
          htmlDetail.value.path,
          htmlPresent,
          jsonKeyUpdateforHtml
        )
        .subscribe((x) => {
          console.log('updated  html successfully');
        });
    } catch (err) {}
  }

  updateEnglishJson(htmlDetail: any, englishData: string, jsonKey: string) {
    try {
      let htmlJsonKeyForJson = htmlDetail.key.split('.')[1];
      this.htmlSer
        .updateJsonfile(
          'ModuleAPS',
          htmlDetail.value.path,
          htmlJsonKeyForJson + '.' + jsonKey,
          englishData,
          'english'
        )
        .subscribe((x) => {
          console.log('updated Json successfully');
        });
    } catch (error) {
      console.log('error updating json');
    }
  }

  check(name: string) {
    console.log(name);
  }

  updateSpanishJson(htmlDetail: any, spanishData: string, jsonKey: string) {
    try {
      let htmlJsonKeyForJson = htmlDetail.key.split('.')[1];

      this.htmlSer
        .updateJsonfile(
          'ModuleAPS',
          htmlDetail.value.path,
          htmlJsonKeyForJson + '.' + jsonKey,
          spanishData,
          'spanish'
        )
        .subscribe((x) => {
          console.log('updated Json successfully');
        });
    } catch (error) {
      console.log('error updating json');
    }
  }

  getKeyCode(jsonKey: string, htmlDetail: any) {
    let htmlJsonKeyForHtml = htmlDetail.key.slice(0, htmlDetail.key.length - 5);
    return `{{trsl('${htmlJsonKeyForHtml}.${jsonKey}')}}`;
  }
}
