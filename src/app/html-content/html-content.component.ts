import { HtmlService } from './../html.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import * as ModuleEnglishAPSJson from '../../../aps/en.json';
import * as ModuleSpanishAPSJson from '../../../aps/es.json';
import { DOCUMENT } from '@angular/common';
import * as _ from 'lodash';

import * as editJson from 'edit-json-file';

@Component({
  selector: 'app-html-content',
  templateUrl: './html-content.component.html',
  styleUrls: ['./html-content.component.css'],
})
export class HtmlContentComponent implements OnInit {
  htmlContent: any = { NeedToConvert: null, translocoModuleData: null };
  active = 1;

  @Input()
  HtmlFilePath: string;
  contentActive: boolean = false;

  alert: any = false;

  // @Output() GetHtmlContentEvent = new EventEmitter<string>();

  constructor(
    public htmlService: HtmlService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {}

  getHtmlFileContent(fileName: string) {
    this.contentActive = !this.contentActive;
    this.htmlContent = this.htmlService
      .getHtmlFileContent(this.HtmlFilePath)
      .subscribe((HtmlContent) => {
        this.htmlContent = HtmlContent;
      });
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

  updateHtmlJson(htmlPresent: string, jsonKey: string) {
    try {
      let htmlJsonPath = this.HtmlFilePath.split('\\').pop();
      let htmlJsonKeyForHtml = htmlJsonPath.slice(0, htmlJsonPath.length - 5);
      let jsonKeyUpdateforHtml = `{{trsl('${htmlJsonKeyForHtml}.${jsonKey}')}}`;
      console.log(jsonKeyUpdateforHtml);
      console.log(htmlPresent);
      console.log(this.HtmlFilePath);
      this.htmlService
        .updateHtmlContent(this.HtmlFilePath, htmlPresent, jsonKeyUpdateforHtml)
        .subscribe((x) => {
          console.log('updated  html successfully');
        });
    } catch (err) {}
  }

  updateEnglishJson(jsonKey: string, englishData: string, htmlPresent: string) {
    try {
      let htmlJsonPath = this.HtmlFilePath.split('\\').pop();
      let htmlJsonKeyForJson = this.HtmlFilePath.split('.')[1];

      this.htmlService
        .updateJsonfile(
          'ModuleAPS',
          this.HtmlFilePath,
          htmlJsonKeyForJson + '.' + jsonKey,
          englishData,
          'english'
        )
        .subscribe((x) => {
          console.log('updated Json successfully');
          this.alert = !alert;
          this.getHtmlFileContent(this.HtmlFilePath);
          this.document.location.reload();
        });
    } catch (error) {
      console.log('error updating json');
    }
  }

  updateSpanishJson(jsonKey: string, spanishData: string, htmlPresent: string) {
    try {
      let htmlJsonPath = this.HtmlFilePath.split('\\').pop();
      let htmlJsonKeyForJson = this.HtmlFilePath.split('.')[1];

      this.htmlService
        .updateJsonfile(
          'ModuleAPS',
          this.HtmlFilePath,
          htmlJsonKeyForJson + '.' + jsonKey,
          spanishData,
          'spanish'
        )
        .subscribe((x) => {
          console.log('updated Json successfully');
          this.alert = !alert;
          this.getHtmlFileContent(this.HtmlFilePath);
        });
    } catch (error) {
      console.log('error updating json');
    }
  }
}
