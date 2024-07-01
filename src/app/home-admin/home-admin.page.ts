import { Component, OnInit } from '@angular/core';
import {AddJobModalComponent} from "../add-job.modal/add-job.modal.component";
import {ModalController} from "@ionic/angular";
import {JobService} from "../jobs/jobs.service";
import {AuthService} from "../auth/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {

  constructor(private modalCtrl: ModalController, private jobService: JobService, private authService: AuthService,private router: Router) { }

  ngOnInit() {
  }

  logoutAdmin(): void {
    this.authService.logoutAdmin(); // Poziv metode za odjavu iz AuthService-a
    this.router.navigate(['/login']); // Preusmeravanje na stranicu za prijavu nakon odjave
  }

  openModal() {
    this.modalCtrl.create({
      component: AddJobModalComponent
    }).then((modal: HTMLIonModalElement) => {
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData) => {
      if (resultData.role === 'confirm') {
        console.log(resultData);
        // povratna vrednost ove POST metode je Observable pa zato moramo da se subscribe-ujemo i da definisemo next fju
        // odnosno sta treba da se desi kad se superhero sacuva na firebase-u
        this.jobService.addJob(
          resultData.data.jobData.title,
          resultData.data.jobData.companyName,
          resultData.data.jobData.location,
          resultData.data.jobData.workMode,
          resultData.data.jobData.activeUntil,
          resultData.data.jobData.description,
          resultData.data.jobData.requiredTechnologies,
          'Active',// default status
          this.authService.getUserId() 
        ).subscribe((res) => {
          console.log(res);
        });
      }
    });
  }

 /*  openModal() {
    this.modalCtrl.create({
      component: AddJobModalComponent
    }).then((modal: HTMLIonModalElement) => {
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData) => {
      if(resultData.role === 'confirm') {
        console.log(resultData);
        //povratna vrednost ove POST metode je Observable pa zato moramo da se subscribe-ujemo i da definisemo next fju
        //odnosno sta treba da se desi kad se superhero sacuva na firebase-u
        this.jobService.addJob(
          resultData.data.jobData.title,
          resultData.data.jobData.companyName,
          resultData.data.jobData.location,
          resultData.data.jobData.workMode,
          resultData.data.jobData.activeUntil,
          resultData.data.jobData.description,
          resultData.data.jobData.requiredTechnologies,
          'Active',
          this.authService.getUserId()
          ).subscribe((res) =>{
          console.log(res);
        })
      }
    })
  } */
}
