import { Component, OnInit } from '@angular/core';
import {MyProfileModalComponent} from "../my-profile-modal/my-profile-modal.component";
import {ModalController} from "@ionic/angular";
import {UserService} from "../user/user.service";
import {AuthService} from "../auth/auth.service";
import { Router } from '@angular/router';
import { User } from '../user/user.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private modalCtrl: ModalController, private userServie: UserService, private authService: AuthService,private router: Router ) { }
  

  ngOnInit() {
  }

  
  logout(): void {
    this.authService.logout(); // Poziv metode za odjavu iz AuthService-a
    this.router.navigate(['/login']);
   // console.log("Uspesna odjava sa sistema"); // Preusmeravanje na stranicu za prijavu nakon odjave
  }

  
  

 openModalMP() {
    this.modalCtrl.create({
      component: MyProfileModalComponent
    }).then((modal: HTMLIonModalElement) => {
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData) => {
      if(resultData.role === 'confirm') {
        console.log(resultData);
        //povratna vrednost ove POST metode je Observable pa zato moramo da se subscribe-ujemo i da definisemo next fju
        //odnosno sta treba da se desi kad se superhero sacuva na firebase-u
        this.userServie.addUser(
          resultData.data.userData.firstName,
          resultData.data.userData.lastName,
          resultData.data.userData.email,
          resultData.data.userData.phone,
          resultData.data.userData.address,
          resultData.data.userData.educationLevel,
          resultData.data.userData.school,
          resultData.data.userData.graduationYear,
          resultData.data.userData.jobTitle,
          resultData.data.userData.employer,
          resultData.data.userData.yearsOfExperience,
          resultData.data.userData.skills,
          resultData.data.userData.additionalInfo,
          this.authService.getUserId(),
          ).subscribe((res) =>{
          console.log(res);
        })
      }
    })
  } 
}
