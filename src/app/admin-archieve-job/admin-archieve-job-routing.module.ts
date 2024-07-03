import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminArchiveJobsPage } from './admin-archieve-job.page';

const routes: Routes = [
  {
    path: '',
    component: AdminArchiveJobsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminArchieveJobPageRoutingModule {}
