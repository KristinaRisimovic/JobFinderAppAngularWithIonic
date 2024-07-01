import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    console.log(form);
    if (form && form.valid) { // Provera da li je form definisan i validan
      this.authService.login(form.value).subscribe(
        resData => {
          console.log("Prijava uspesna");
          console.log(resData);
          this.router.navigateByUrl("/");
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
