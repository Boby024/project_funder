import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {StartpageModule} from './startpage/startpage.module';
import {RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HeaderModule} from './header/header.module';
import {DialogboxModule} from './dialogbox/dialogbox.module';
import {AccountModule} from './account/account.module';
import {ErrorPageModule} from './error-page/error-page.module';
import {PageNotFoundComponent} from './error-page/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  // {path: 'header', component: HeaderOverviewComponent},
  // {path: '', component: AppComponent},
  {
    path: 'projectfunder',
    loadChildren: () => import('./startpage/startpage.module').then(mod => mod.StartpageModule)
  },
  { path: 'projectfunder/register',
    loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule),
  },
  {
    path: 'projectfunder/page_not_found',
    loadChildren: () => import('./error-page/error-page.module').then(mod => mod.ErrorPageModule),
  },
  {
    path: '',
    redirectTo: '/projectfunder',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    StartpageModule,
    BrowserAnimationsModule,
    HeaderModule,
    DialogboxModule,
    AccountModule,
    ErrorPageModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
