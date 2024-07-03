import { Component, OnInit } from '@angular/core';
import {AddJobModalComponent} from "../add-job.modal/add-job.modal.component";
import {ModalController} from "@ionic/angular";
import {JobService} from "../jobs/jobs.service";
import {AuthService} from "../auth/auth.service";
import { Router } from '@angular/router';
import { Job } from '../jobs/job.model';


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
    //console.log("Uspesna odjava sa sistema");
  }

   /*  openModal() {
      this.modalCtrl.create({
        component: AddJobModalComponent
      }).then((modal: HTMLIonModalElement) => {
        modal.present();
        return modal.onDidDismiss();
      }).then((resultData) => {
        if (resultData.role === 'confirm') {
          console.log(resultData);
          
          const jobData = resultData.data.JobData; // Dobijamo podatke iz modalnog prozora
    
          // Kreiramo novi objekat Job sa dodatim id-om
          const newJob: Job = {
            id: this.generateUniqueId(), //ovde treba videti sta da bude id zapravo
            title: jobData.title,
            companyName: jobData.companyName,
            location: jobData.location,
            workMode: jobData.workMode,
            activeUntil: jobData.activeUntil,
            description: jobData.description,
            requiredTechnologies: jobData.requiredTechnologies,
            status: 'Active', // Default status
            userId: this.authService.getUserId()
          };
          if (newJob.userId) {
    
          // Dodavanje posla u bazu koristeći AngularFire
          this.jobService.addJob(newJob).then(ref => {
            console.log('Dodat posao sa ID-jem:', ref.key);
          }).catch(error => {
            console.error('Greška prilikom dodavanja posla:', error);
          });
        } else {
          console.error('Korisnik nije autentifikovan.');
        }
        }
      });
    }
   */
    generateUniqueId(): string {
      return Math.random().toString(36).substr(2, 9);
    }

  openModal() {
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
          this.authService.getUserId(),
           'bookmark-outline').subscribe((res) =>{
          console.log(res);
        })
      }
    })
  } 
}
