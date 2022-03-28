import { BindedPropComponent } from './binded-prop/binded-prop.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HtmlComponent } from './html.component';
import { TranslocoComponent } from './transloco/transloco.component';
import { ConvertableComponent } from './convertable/convertable.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { LanguageComponent } from './language/language.component';
import { MatTableModule } from '@angular/material/table';
import { ClipboardModule } from 'ngx-clipboard';
import { MatDialogModule } from '@angular/material/dialog';

const htmlroutes: Routes = [
  { path: '', component: HtmlComponent },
  { path: 'transloco', component: TranslocoComponent },
  { path: 'convertible', component: ConvertableComponent },
  { path: 'bindedProp', component: BindedPropComponent },
];

@NgModule({
  declarations: [
    HtmlComponent,
    TranslocoComponent,
    ConvertableComponent,
    BindedPropComponent,
    LanguageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(htmlroutes),
    MatTabsModule,
    MatExpansionModule,
    MatTableModule,
    ClipboardModule,
    MatDialogModule,
  ],
  exports: [TranslocoComponent, ConvertableComponent, BindedPropComponent],
})
export class HtmlModule {}
