import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderOverviewComponent } from './header-overview/header-overview.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [HeaderOverviewComponent],
  exports: [
    HeaderOverviewComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    FlexLayoutModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ]
})
export class HeaderModule { }
