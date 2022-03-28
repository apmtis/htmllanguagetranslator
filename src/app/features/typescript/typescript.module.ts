import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TypescriptComponent } from './typescript.component';


const routes: Routes = [
  { path: '', component: TypescriptComponent }
];

@NgModule({
  declarations: [
    TypescriptComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TypescriptModule { }
