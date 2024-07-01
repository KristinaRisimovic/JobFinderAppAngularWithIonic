import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProfilePage } from './myProfile.page';



const routes: Routes = [
  {
    path: '',
    component: MyProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyProfilePageRoutingModule {}