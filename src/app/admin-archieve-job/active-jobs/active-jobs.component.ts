import {Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Job} from "../../jobs/job.model";
import {AlertController} from "@ionic/angular";
import {AuthService} from "../../auth/auth.service";
import {JobService} from "../../jobs/jobs.service";
import {JobsPage} from "../../jobs/jobs.page";

@Component({
  selector: 'app-active-jobs',
  templateUrl: './active-jobs.component.html',
  styleUrls: ['./active-jobs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveJobsComponent implements OnInit {

  //iconNameCurrent: string = "bookmark-outline";
  @Input() job: Job; /*= {
    id: "j1",
    title: "Java Developer",
    companyName: "Grid Dynamics",
    location: "Belgrade, Serbia",
    workMode: "Office",
    activeUntil:new Date("2024-10-10"),
    description:"Grid Dynamics empowers enterprises to drive growth, boost efficiency, and transform their digital capabilities through expert technology consulting, platform and product engineering, AI, and advanced analytics.",
    requiredTechnologies:"Java",
    status:'Active',
    
    userId: "9anSQbvku2SyIgTNTaale2lxtFv2",
    iconName: ""
  }; */

  constructor(private alertCtrl: AlertController, 
     private jobService: JobService
     ) { }

  ngOnInit() {

  }

  ionViewWillEnter(){

  }

archieve(job: Job) {
  
  if (job.status=="Active") {
    this.openAlert().then(result => {
      if (result) {
        this.jobService.updateJobStatus(job.id).subscribe(
          response => {
            // Ovaj blok koda se izvršava kada zahtev uspe
            console.log('Job archived successfully', response);
          },
          error => {
            // Ovaj blok koda se izvršava kada se desi greška
            console.error('Error archiving job', error);
          }
        );
      }
    });
  } 
}

openAlert(): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    this.alertCtrl.create({
      header: 'Archiving a job',
      message: 'Are you sure you want to archive this job?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            console.log('Do it');
            resolve(true); // Rezolucija Promise-a sa vrednošću true kada se pritisne Save
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel');
            resolve(false); // Rezolucija Promise-a sa vrednošću false kada se pritisne Cancel
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  });
}

}
