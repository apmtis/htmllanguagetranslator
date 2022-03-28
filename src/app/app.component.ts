import { HtmlService } from './html.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Html MultiLanguage Translator';
  files: any;
  htmlFileContent: any;

  constructor(public htmlSer: HtmlService) {
    console.log('service calling');
    this.htmlSer.getHtmlFiles();
    // .subscribe((htmlFiles: any) => {
    //   this.files = htmlFiles;
    //   console.log(this.files);
    // });
  }

  // getHtmlFileContent(fileName: any) {
  //   this.htmlSer
  //     .getHtmlFileContent(fileName)
  //     .subscribe((HtmlFileContent: any) => {
  //       this.htmlFileContent = HtmlFileContent;
  //     });
  // }
}
