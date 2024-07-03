import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminArchieveJobPageRoutingModule } from './admin-archieve-job-routing.module';

import { AdminArchiveJobsPage } from './admin-archieve-job.page';
import { ActiveJobsComponent } from './active-jobs/active-jobs.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminArchieveJobPageRoutingModule
  ],
  exports: [
    ActiveJobsComponent
 ],
  declarations: [AdminArchiveJobsPage, ActiveJobsComponent]
})
export class AdminArchieveJobPageModule {}
