import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, switchMap, take, tap,throwError} from "rxjs";
import { User } from './user.model';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {environment} from "../../environments/environment";
//import { Title } from '@angular/platform-browser';

interface UserData {
    
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    educationLevel: string;
    school: string;
    graduationYear: string;
    jobTitle:string;
    employer: string;
    yearsOfExperience: string;
    skills: string;
    additionalInfo: string;
    userId:string;
  }

@Injectable({
  providedIn: 'root'
})
export class UserService {

  

  userList: User[];
  private users = new BehaviorSubject<User[]>([]);
 
  
  //jobs$ = this.jobs.asObservable();
  get _users(): Observable<User[]> {
    return this.users.asObservable();
  }
 
  id: string;
  
  constructor(private http: HttpClient, private authService: AuthService) {}

 
  getUserData(): Observable<any> {
    const userId = this.authService.getUserId(); // Pretpostavka: AuthService ima metodu za dohvatanje userId-a
    console.log('id: ' + userId);
    return this.http.get<any>(`${environment.databaseURL}/users/${userId}.json`);
  }

  /*saveUserData(userData: any): Observable<any> {
    const userId = this.authService.getUserId(); // Pretpostavka: AuthService ima metodu za dohvatanje userId-a
    return this.http.put(`${environment.databaseURL}/users/${userId}.json`, userData);
  }*/
    saveUserData(userData: any): Observable<any> {
      const token = this.authService.getToken();
      if (token) {
        return this.http.post(`${environment.databaseURL}/users.json?auth=${token}`, userData);
      } else {
    
        console.error('Korisnik nije autentifikovan.');
        throw new Error('Korisnik nije autentifikovan.');
      }
    }



  

    addUser( 
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        address: string,
        educationLevel: string,
        school: string,
        graduationYear: string,
        jobTitle:string,
        employer: string,
        yearsOfExperience: string,
        skills: string,
        additionalInfo: string,
        userId:string
    ) {
    let generatedId: string;
   // const userId: string = this.authService.getUserId() ?? '';
    return this.http.post<{name: string}>(
      `${environment.databaseURL}/users.json?auth=${this.authService.getToken()}`,
      {firstName, lastName, email, phone, address, educationLevel, school, graduationYear, jobTitle, employer,yearsOfExperience,skills,additionalInfo,userId})
     .pipe(
        switchMap((resData) => {
          generatedId = resData.name;
          return this._users;
        }),
        take(1),
        tap((_users) => {
          const newUser: User = {
            id: generatedId,
            firstName,
            lastName,
            email,
            phone,
            address,
            educationLevel,
            school,
            graduationYear,
            jobTitle,
            employer,
            yearsOfExperience,
            skills,
            additionalInfo,
            userId
          };
          this.users.next(_users.concat(newUser));
            })
          );
        } 
     
  
 
   getUsers() {
    return this.http.get<{[key: string]: UserData}>(`${environment.databaseURL}/users.json?auth=${this.authService.getToken()}`)
      .pipe(map((userData: any) => {
        const _users: User[] = [];
        for(const key in userData) {
          _users.push({
            id: key,
            firstName: userData[key].firstName,
            lastName:userData[key].lastName,
            email:userData[key].email,
            phone:userData[key].phone,
            address:userData[key].address,
            educationLevel:userData[key].educationLevel,
            school:userData[key].school,
            graduationYear:userData[key].graduationYear,
            jobTitle:userData[key].jobTitle,
            employer:userData[key].employer,
            yearsOfExperience:userData[key].yearsOfExperience,
            skills:userData[key].skills,
            additionalInfo:userData[key].additionalInfo,
            userId:userData[key].userId
          })
        }
        return _users;
      }),
        tap((_users) => {
          this.users.next(_users);
        }));
  }
 
  updateJob(id: string, updatedJob: { title:string, companyName:string, location:string, workMode:string, activeUntil:Date, description:string,requiredTechnologies:string, iconName: string}) {
    return this.http.put('https://job-finder-app-152f8-default-rtdb.europe-west1.firebasedatabase.app/jobs/'+id+'.json', updatedJob);
  }
   

  


  
  
}
 
 
 







