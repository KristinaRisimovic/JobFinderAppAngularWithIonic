import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JobService } from './jobs.service';
import { Job } from './job.model';
import { ViewWillEnter } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit, OnDestroy, ViewWillEnter {
  jobs: Job[] = [];
  private jobSub: Subscription = new Subscription();

  newJob = {
    title: '',
    companyName: '',
    location: '',
    workMode: '',
    activeUntil: new Date(),
    description: '',
    requiredTechnologies: '',
    status: 'Active' as 'Active'
  };

  constructor(private jobService: JobService, private authService: AuthService) {}

  ngOnInit() {
    this.jobSub = this.jobService.getJobs().subscribe((jobData) => {
      this.jobs = jobData;
    });
  }

  ionViewWillEnter() {
    this.jobService._jobs.subscribe((jobData) => {
      this.jobs = jobData;
    });
  }

  /* addJob() {
    const { title, companyName, location, workMode, activeUntil, description, requiredTechnologies, status } = this.newJob;
    this.jobService.addJob(title, companyName, location, workMode, activeUntil, description, requiredTechnologies, status, userId).subscribe(() => {
      this.newJob = {
        title: '',
        companyName: '',
        location: '',
        workMode: '',
        activeUntil: new Date(),
        description: '',
        requiredTechnologies: '',
        status: 'Active'
      };
      this.ionViewWillEnter();
    });
  } */

  /* archiveJob(id: string) {
    this.jobService.archiveJob(id);
    this.ionViewWillEnter();
  }*/

  ngOnDestroy() {
    if (this.jobSub) {
      this.jobSub.unsubscribe();
    }
  }
}