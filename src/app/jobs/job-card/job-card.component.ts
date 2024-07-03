import { Component, OnInit } from '@angular/core';
import { JobService } from '../jobs.service';
import { Job } from '../job.model';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
})
export class JobCardComponent  implements OnInit {
  jobs: Job[] = [];
  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.jobService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
    });
  }

}




