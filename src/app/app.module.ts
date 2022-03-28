import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HtmlContentComponent } from './html-content/html-content.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddLanguageComponent } from './add-language/add-language.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [
  { path: '', redirectTo: 'content', pathMatch: 'full' },
  {
    path: 'html',
    loadChildren: () =>
      import('./features/html/html.module').then((m) => m.HtmlModule),
  },
  {
    path: 'typescript',
    loadChildren: () =>
      import('./features/typescript/typescript.module').then(
        (m) => m.TypescriptModule
      ),
  },
];
@NgModule({
  declarations: [AppComponent, HtmlContentComponent, AddLanguageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
