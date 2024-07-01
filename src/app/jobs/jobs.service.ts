import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, switchMap, take, tap,throwError} from "rxjs";
import { Job } from './job.model';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {environment} from "../../environments/environment";
import { Title } from '@angular/platform-browser';

interface JobData {
    
    title: string;
    companyName: string;
    location: string;
    workMode: string;
    activeUntil: Date;
    description: string;
    requiredTechnologies: string;
    status: 'Active' | 'Archived';
    userId:string;
  }
@Injectable({
  providedIn: 'root'
})
export class JobService {
  private jobs = new BehaviorSubject<Job[]>([]);
  //jobs$ = this.jobs.asObservable();
  get _jobs(): Observable<Job[]> {
    return this.jobs.asObservable();
  }

  constructor(private http: HttpClient, private authService: AuthService) {}

  addJob(title: string,
     companyName: string,
      location:string,
      workMode: string,
      activeUntil: Date,
      description: string,
      requiredTechnologies: string,
       status:'Active' | 'Archived',
      
    ) {
    let generatedId: string;
    const userId: string = this.authService.getUserId() ?? '';
    return this.http.post<{name: string}>(
      `${environment.databaseURL}/jobs.json?auth=${this.authService.getToken()}`,
      {title, companyName, location, workMode, activeUntil, description, requiredTechnologies, status, userId})
     .pipe(
        switchMap((resData) => {
          generatedId = resData.name;
          return this._jobs;
        }),
        take(1),
        tap((_jobs) => {
          const newJob: Job = {
            id: generatedId,
            title,
            companyName,
            location,
            workMode,
            activeUntil,
            description,
            requiredTechnologies,
            status,
            userId
          };
          this.jobs.next(_jobs.concat(newJob));
            })
          );
        }
    
  
 
  getJobs() {
    return this.http.get<{[key: string]: JobData}>(`${environment.databaseURL}/jobs.json?auth=${this.authService.getToken()}`)
      .pipe(map((JobData: any) => {
        const _jobs: Job[] = [];
        for(const key in JobData) {
          _jobs.push({
            id: key,
            title: JobData[key].title,
            companyName: JobData[key].companyName,
            location:JobData[key].location,
            workMode:JobData[key].workMode,
            activeUntil:JobData[key].activeUntil,
            description:JobData[key].description,
            requiredTechnologies:JobData[key].requiredTechnologies,
            status:JobData[key].status,
            userId: JobData[key].userId
          })
        }
        return _jobs;
      }),
        tap((_jobs) => {
          this.jobs.next(_jobs);
        }));
  }
 

  /* updateJob(updatedJob: Job) {
    const currentJobs = this.jobs.getValue();
    const jobIndex = currentJobs.findIndex(job => job.id === updatedJob.id);
    if (jobIndex > -1) {
      currentJobs[jobIndex] = updatedJob;
      this.jobs.next([...currentJobs]);
    }
  } */

    archiveJob(id: string): void{
      const currentJobs = this.jobs.getValue();
      const jobIndex = currentJobs.findIndex(job => job.id === id);
      if (jobIndex > -1) {
        currentJobs[jobIndex].status = 'Archived';
         this.http
          .put<void>(`${environment.databaseURL}/jobs/${id}.json?auth=${this.authService.getToken()}`, 
            { ...currentJobs[jobIndex] })
          .pipe(
            switchMap(() => this._jobs),
            take(1),
            tap(() => {
              this.jobs.next([...currentJobs]);
            })
          );
         /*  .subscribe({
            next: () => {
              console.log('Uspešna promena');
            },error: (error) => {
              console.error('Greška prilikom promene', error);
            }}) */
      } else {
         throwError(() => new Error('Job not found'));
      }
    }
 /*  archiveJobs(id: string) {
    const currentJobs = this.jobs.getValue();
    const jobIndex = currentJobs.findIndex(job => job.id === jobId);
    if (jobIndex > -1) {
      currentJobs[jobIndex].status = 'Archived';
      this.jobs.next([...currentJobs]);
    }
  } */

 
}
