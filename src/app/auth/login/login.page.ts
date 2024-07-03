import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Role } from '../role';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

/*   onLogin(form: NgForm) {
    console.log(form);
    if (form && form.valid) { // Provera da li je form definisan i validan
      this.authService.login(form.value).subscribe(
        resData => {
          console.log("Prijava uspesna");
          console.log(resData);
          if (this.authService.isThisAdmin()) {
            this.router.navigateByUrl("/home-admin");
          } else {
            this.router.navigateByUrl("/home");
          }

        },
        error => {
          console.error("Greška pri prijavi:", error);
        }
      );
    }
  } */
    onLogin(form: NgForm) {
      if (form && form.valid) {
        this.authService.login(form.value).subscribe(
          resData => {
            console.log("Prijava uspesna");
            console.log(resData);
            // Provera da li je korisnik admin na osnovu uloge postavljene u auth.service.ts
            if (this.authService.user && this.authService.user.role === Role.Admin) {
              console.log("Prijavljen admin");
              this.router.navigateByUrl("/home-admin");
              //this.router.navigateByUrl("/job-cards");

            } else {
              console.log("Prijavljen korisnik");

              this.router.navigateByUrl("/home");
            }
          },
          error => {
            console.error("Greška pri prijavi:", error);
          }
        );
      }
    }
  

  toRegister() {
    this.router.navigateByUrl('register');
  }
}
