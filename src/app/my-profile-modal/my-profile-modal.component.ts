import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
//import { Role } from '../auth/role';

@Component({
  selector: 'app-my-profile-modal',
  templateUrl: './my-profile-modal.component.html',
  styleUrls: ['./my-profile-modal.component.scss'],
})
export class MyProfileModalComponent  implements OnInit {

  // @ts-ignore
  @ViewChild("f", {static: true}) form: NgForm;
  constructor(private modalCtrl: ModalController, private authService: AuthService) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onAddUser() {
    if(this.form.invalid) {
      return;
    }
    this.modalCtrl.dismiss({userData: {
      firstName: this.form.value['firstName'],
      lastName: this.form.value['lastName'],
      email: this.form.value['email'],
      phone: this.form.value['phone'],
      address:this.form.value['address'],
      educationLevel: this.form.value['educationLevel'],
      school: this.form.value['school'],
      graduationYear: this.form.value['graduationYear'],
      jobTitle: this.form.value['jobTitle'],
      employer: this.form.value['employer'],
      yearsOfExperience: this.form.value['yearsOfExperience'],
      skills: this.form.value['skills'],
      additionalInfo: this.form.value['additionalInfo'],
      userId: this.authService.getUserId()
      }}, 'confirm');



  }

}
