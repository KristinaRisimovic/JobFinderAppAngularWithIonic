import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { User } from "./user.model";
import { Role } from './role';
import { environment } from 'src/environments/environment';
import{of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isUserAuthenticated = false;
  private adminEmail = 'admin@admin';
  private adminPassword = 'password123';
  private adminRole = Role.Admin; // Hardkodovana uloga admina

  user: User | null = null;

  constructor(private http: HttpClient) { }

  get isUserAuthenticated() {
    if (this.user) {
      return !!this.user.token && new Date() < this.user.tokenExpirationDate;
    }
    return false;
  }

  getUserId() {
    return this.user ? this.user.id : null;
  }

  register(user: UserData) {
    this._isUserAuthenticated = true;
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`,
      { email: user.email, password: user.password, returnSecureToken: true }
    );
  }

  login(user: UserData) {
    this._isUserAuthenticated = true;
    // Provera da li je korisnik admin
    if (user.email === this.adminEmail && user.password === this.adminPassword) {
      const expirationTime = new Date(new Date().getTime() + 3600 * 1000); // 1 sat
      this.user = new User('adminId', this.adminEmail, 'adminToken', expirationTime, this.adminRole);
      return of(null); // Prekidamo dalji proces prijave jer je admin prijava uspešna
    }

    // Ako nije admin, nastavljamo sa standardnom prijavom
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
      { email: user.email, password: user.password, returnSecureToken: true }
    ).pipe(
      tap(
        (userData) => {
          const expirationTime = new Date(new Date().getTime() + +userData.expiresIn * 1000);
          this.user = new User(userData.localId, userData.email, userData.idToken, expirationTime, Role.User);
        }
      )
    );
  }
  
  logout() {
    this._isUserAuthenticated = false;
    this.user = null;
  }

  logoutAdmin() {
    this._isUserAuthenticated = false;
    this.user = null;
  }
  getToken() {
    return this.user && this.user.token ? this.user.token : null;
  }
}

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

interface UserData {
  name?: string;
  surname?: string;
  email: string;
  password: string;
}
