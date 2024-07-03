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
    iconName:string;
  }
  interface FavoritesData{
    jobID: string;
    userId: String;
  }
@Injectable({
  providedIn: 'root'
})
export class JobService {

  

  jobsList: Job[];
  private jobs = new BehaviorSubject<Job[]>([]);
  private _favorites = new BehaviorSubject<Job[]>([])
  favoriteForDeleteId: string;
  //jobs$ = this.jobs.asObservable();
  get _jobs(): Observable<Job[]> {
    return this.jobs.asObservable();
  }
  get favorites(){
    return this._favorites.asObservable();
  }
  id: string;
  isIt: Boolean;
  constructor(private http: HttpClient, private authService: AuthService) {}

  addJob1(title: string,
    companyName: string,
     location:string,
     workMode: string,
     activeUntil: Date,
     description: string,
     requiredTechnologies: string){
        return this.http.post<{id: string}>(
          `${environment.databaseURL}/jobs.json?auth=${this.authService.getToken()}`,
          {title, companyName, location, workMode, activeUntil, description, requiredTechnologies})
  }




  addJob2(title: string,
    companyName: string,
     location:string,
     workMode: string,
     activeUntil: Date,
     description: string,
     requiredTechnologies: string,
     // status:'Active' | 'Archived',
      userId:string){
        return this.http.post<{id: string}>(
          `${environment.databaseURL}/jobs.json?auth=${this.authService.getToken()}`,
          {title, companyName, location, workMode, activeUntil, description, requiredTechnologies, /* status, */ userId})
  }

    addJob(title: string,
     companyName: string,
      location:string,
      workMode: string,
      activeUntil: Date,
      description: string,
      requiredTechnologies: string,
       status:'Active' | 'Archived',
       userId:string,
       iconName: string
    ) {
    let generatedId: string;
   // const userId: string = this.authService.getUserId() ?? '';
    return this.http.post<{name: string}>(
      `${environment.databaseURL}/jobs.json?auth=${this.authService.getToken()}`,
      {title, companyName, location, workMode, activeUntil, description, requiredTechnologies, status, userId, iconName})
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
            status:'Active',
            userId,
            iconName
          };
          this.jobs.next(_jobs.concat(newJob));
            })
          );
        } 
     
  
 
   getJobs() {
    return this.http.get<{[key: string]: JobData}>(`${environment.databaseURL}/jobs.json?auth=${this.authService.getToken()}`)
      .pipe(map((jobData: any) => {
        const _jobs: Job[] = [];
        for(const key in jobData) {
          _jobs.push({
            id: key,
            title: jobData[key].title,
            companyName: jobData[key].companyName,
            location:jobData[key].location,
            workMode:jobData[key].workMode,
            activeUntil:jobData[key].activeUntil,
            description:jobData[key].description,
            requiredTechnologies:jobData[key].requiredTechnologies,
            status:jobData[key].status,
            userId: jobData[key].userId,
            iconName:jobData[key].iconName
          })
        }
        return _jobs;
      }),
        tap((_jobs) => {
          this.jobs.next(_jobs);
        }));
  }
 
  updateJob(id: string, updatedJob: { title:string, companyName:string, location:string, workMode:string, activeUntil:Date, description:string,requiredTechnologies:string, iconName: string}) {
    return this.http.put('https://job-finder-app-152f8-default-rtdb.europe-west1.firebasedatabase.app/jobs/'+id+'.json', updatedJob);
  }
   updateJob1(updatedJob: Job) {
    const currentJobs = this.jobs.getValue();
    const jobIndex = currentJobs.findIndex(job => job.id === updatedJob.id);
    if (jobIndex > -1) {
      currentJobs[jobIndex] = updatedJob;
      this.jobs.next([...currentJobs]);
    }
  } 

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
            /*.subscribe({
            next: () => {
              console.log('Uspešna promena');
            },error: (error) => {
              console.error('Greška prilikom promene', error);
            }}) */ 
       } else {
         throwError(() => new Error('Job not found'));
      }
    }
   archiveJobs(id: string) {
    const currentJobs = this.jobs.getValue();
    const jobIndex = currentJobs.findIndex(job => job.id === id);
    if (jobIndex > -1) {
      currentJobs[jobIndex].status = 'Archived';
      this.jobs.next([...currentJobs]);
    }
  } 
  deleteFavorite(jobID: string) {
    let id2: string = "";
    this.getFavoriteByJobIDAndUserId(jobID).subscribe(res=> {
      id2 = res;
      console.log(res);
      return this.http.delete('https://job-finder-app-152f8-default-rtdb.europe-west1.firebasedatabase.app/favorites/'+res+'.json').subscribe();
    });
  }

  getFavoriteByJobIDAndUserId(jobID: String) {
    return this.http.get<{[key: string]: FavoritesData}>('https://job-finder-app-152f8-default-rtdb.europe-west1.firebasedatabase.app/favorites.json')
      .pipe(map((favoritesData)=>{
          console.log(favoritesData);
          for(const key in favoritesData){
            //provera da ne gleda nasledjene property-je
            if(favoritesData.hasOwnProperty(key) && favoritesData[key].userId == this.authService.getUserId() && favoritesData[key].jobID == jobID){
              this.favoriteForDeleteId = key;
            }
          }

          console.log(this.favoriteForDeleteId);
          return this.favoriteForDeleteId;
        }))
  }
  addFavorite(jobID: String,
    userId: String) {
return this.http.post<{id: string}>('https://job-finder-app-152f8-default-rtdb.europe-west1.firebasedatabase.app/favorites.json', {
jobID, userId
})
}
}
 
 
 


/*pokusaj drugog pristupa*/
 /* import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Job } from './job.model';

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
  private jobsRef: AngularFireList<any>;
  private jobsSubject: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>([]);

  constructor(private db: AngularFireDatabase) {
    this.jobsRef = this.db.list<Job>('jobs');

    // Učitavanje početnih podataka
    this.loadInitialData();
  }

  private loadInitialData() {
    this.jobsRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const key = action.payload.key;
          const data = action.payload.val() as Job;
          return { id: key, ...data };
        });
      })
    ).subscribe(jobs => {
      this.jobsSubject.next(jobs);
    });
  }

  get _jobs(): Observable<Job[]> {
    return this.jobsSubject.asObservable();
  }

  addJob(jobData: Job) {
    return this.jobsRef.push(jobData);
  }

  getJobs(): Observable<Job[]> {
    return this.jobsRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const key = action.payload.key;
          const data = action.payload.val() as Job;
          return { id: key, ...data };
        });
      })
    );
  }

  // Dodatne metode za ažuriranje, brisanje ili čitanje podataka

}
  */




