import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { DomHandler } from 'domhandler';
import { Parser } from 'htmlparser2';
import { readFileSync } from 'fs';

@Injectable({
  providedIn: 'root',
})
export class HtmlService {
  htmlFiles: any;
  constructor(private http: HttpClient) {}

  baseUrl: string = 'http://localhost:3000/';

  getHtmlFiles() {
    return this.http.get(`${this.baseUrl}getHtmlData`).subscribe((x) => {
      console.log(x);
      this.htmlFiles = x;
    });
  }

  getHtmlFileContent(htmlfiles: string) {
    return this.http.post(`${this.baseUrl}getHtmlFileContent`, {
      htmlFiles: htmlfiles,
    });
  }

  updateJsonFile(jsonContent: string) {
    console.log(jsonContent);
    return this.http.post(`${this.baseUrl}updateJsonFile`, {
      jsonContent: jsonContent,
    });
  }

  updateJsonfile(
    moduleName: string,
    htmlName: string,
    jsonKey: string,
    englishContent: string,
    language: string
  ) {
    console.log('hitting');
    return this.http.post(`${this.baseUrl}updateJsonContent`, {
      moduleName: moduleName,
      htmlName: htmlName,
      jsonKey: jsonKey,
      englishContent: englishContent,
      language,
    });
  }

  updateHtmlContent(
    htmlFilePath: string,
    jsonPrevious: string,
    jsonNext: string
  ) {
    return this.http.post(`${this.baseUrl}updateHtmlContent`, {
      htmlFilePath: htmlFilePath,
      jsonPrevious: jsonPrevious,
      jsonNext: jsonNext,
    });
  }

  generateJSON(jsonData: any) {
    // return this.http.post(${})
  }
}
