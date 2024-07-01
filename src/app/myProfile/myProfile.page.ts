import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './myProfile.page.html',
  styleUrls: ['./myProfile.page.scss']
})
export class MyProfilePage implements OnInit {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      educationLevel: ['', Validators.required],
      school: [''],
      graduationYear: [''],
      jobTitle: [''],
      employer: [''],
      yearsOfExperience: [''],
      skills: [''],
      additionalInfo: ['']
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      // Ovde možete implementirati logiku za čuvanje podataka, npr. pozivom servisa
      console.log(this.profileForm.value);
      // Resetujte formu ili prikažite poruku o uspešnom čuvanju
      this.profileForm.reset();
      console.log("Uspesno sacuvano!")
    }else{
      console.log("Neuspesno");
    }
  }
}
