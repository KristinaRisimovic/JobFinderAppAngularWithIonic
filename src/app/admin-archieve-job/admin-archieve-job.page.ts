import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JobService } from '../jobs/jobs.service';
import { Job } from '../jobs/job.model';
import { ViewWillEnter } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-admin-archieve-job',
  templateUrl: './admin-archieve-job.page.html',
  styleUrls: ['./admin-archieve-job.page.scss'],
})
export class AdminArchiveJobsPage implements OnInit, OnDestroy,ViewWillEnter {
  jobs: Job[] = [];
  private jobSub: Subscription = new Subscription();

  constructor(private jobService: JobService, private authService: AuthService) { }

  ngOnInit() {
    this.jobSub = this.jobService.getJobs().subscribe((jobData) => {
      this.jobs = jobData;
    });
  }
 
  ionViewWillEnter() {
    this.jobService.getJobs().subscribe((jobData) => {
      this.jobs = jobData;
    });
  }

  
  ngOnDestroy() {
    if (this.jobSub) {
      this.jobSub.unsubscribe();
    }
  }
  
}





  