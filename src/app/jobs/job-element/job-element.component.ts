import {Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Job} from "../job.model";
import {AlertController} from "@ionic/angular";
import {AuthService} from "../../auth/auth.service";
import {JobService} from "../jobs.service";
import {JobsPage} from "../jobs.page";

@Component({
  selector: 'app-job-element',
  templateUrl: './job-element.component.html',
  styleUrls: ['./job-element.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobElementComponent implements OnInit {

  iconNameCurrent: string = "bookmark-outline";
  @Input() job: Job = {
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
  };
  constructor(private alertCtrl: AlertController, private authService: AuthService, private jobService: JobService, private jp: JobsPage) { }

  ngOnInit() {

  }

  ionViewWillEnter(){

  }
   setName(jobID: string, iconName: string) {
    this.iconNameCurrent = iconName;
  } 

  status(id: string, title: string, companyName: string,location: string,workMode:string,activeUntil: Date, description: string, requiredTechnologies: string, status:'Active'| 'Archived', iconName:string) {
  if(this.iconNameCurrent == 'bookmark-outline'){
    this.jobService.addFavorite(id, this.authService.getUserId()).subscribe();
    this.jp.updateJobIcon(id, title, companyName, location, workMode, activeUntil, description,requiredTechnologies, "bookmark");
  }  else{
    this.jobService.deleteFavorite(id);
    this.jp.updateJobIcon(id, title, companyName, location, workMode, activeUntil,description ,requiredTechnologies,"bookmark-outline");
  }
}

  openAlert(){

    this.alertCtrl.create({
      header: "Saving job as favorite",
      message: "Are you sure you want to save this job on your favorite list?",
      buttons:[
        {
          text: 'Save',
          handler: () =>{
            console.log('Save it');

          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () =>{
            console.log('Cancel');
          }
        }
      ]
    }).then((alert)=>{
      alert.present();
      //posto ova openAlert metoda vraca promise, moramo ovim then delom da se osiguramo da se ce prikazati sam alert
    });
  }


}
