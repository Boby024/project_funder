import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {StartpageModule} from './startpage/startpage.module';
import {RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HeaderModule} from './header/header.module';
import {DialogboxModule} from './dialogbox/dialogbox.module';

const appRoutes: Routes = [
  // {path: 'header', component: HeaderOverviewComponent},
  // {path: '', component: AppComponent},
  {
    path: 'projectfunder',
    loadChildren: () => import('./startpage/startpage.module').then(mod => mod.StartpageModule)
  },
  {
    path: '',
    redirectTo: '/projectfunder',
    pathMatch: 'full',
  }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    StartpageModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    HeaderModule,
    DialogboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
