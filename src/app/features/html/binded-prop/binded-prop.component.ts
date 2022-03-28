import { Component, OnInit } from '@angular/core';
import { HtmlService } from 'src/app/html.service';

@Component({
  selector: 'app-binded-prop',
  templateUrl: './binded-prop.component.html',
  styleUrls: ['./binded-prop.component.css'],
})
export class BindedPropComponent implements OnInit {
  constructor(public htmlSer: HtmlService) {}

  ngOnInit(): void {}
}
