import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobsPageRoutingModule } from './jobs-routing.module';
import {JobElementComponent} from "./job-element/job-element.component";

import {JobCardComponent} from "./job-card/job-card.component";
import { JobsPage } from './jobs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobsPageRoutingModule
  ],
  exports: [
     JobElementComponent,   JobCardComponent
  ],
  declarations: [JobsPage,  JobElementComponent,  JobCardComponent]
})
export class JobsPageModule {}
