import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MyProfilePageRoutingModule } from './myProfile-routing.module';
import { MyProfilePage } from './myProfile.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyProfilePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MyProfilePage]
})
export class MyProfilePageModule {}