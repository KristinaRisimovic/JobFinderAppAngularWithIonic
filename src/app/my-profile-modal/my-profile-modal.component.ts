import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { FormGroup, NgForm, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-my-profile-modal',
  templateUrl: './my-profile-modal.component.html',
  styleUrls: ['./my-profile-modal.component.scss'],
})
export class MyProfileModalComponent implements OnInit {

  profileForm: FormGroup;
  
  @Input() userData: any; // Ulazni parametar za podatke o korisniku

  @ViewChild("f", { static: false }) form: NgForm;

  constructor(private modalCtrl: ModalController, private authService: AuthService,  private fb: FormBuilder,) { }

  ngOnInit() {
    this.initProfileForm();
  }

  initProfileForm() {
    this.profileForm = this.fb.group({
      firstName: ['Katarina', Validators.required],
      lastName: ['Javorac', Validators.required],
      email: ['kaca@gmail.com', [Validators.required, Validators.email]],
      phone: ['0695361511'],
      address: ['Kumodraz'],
      educationLevel: ['', Validators.required],
      school: ['fon'],
      graduationYear: ['2024'],
      jobTitle: ['j'],
      employer: ['e'],
      yearsOfExperience: ['2'],
      skills: ['s'],
      additionalInfo: ['none']
    });
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onAddUser() {
    if (this.form.invalid) {
      return;
    }
    this.modalCtrl.dismiss({
      userData: {
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        email: this.form.value.email,
        phone: this.form.value.phone,
        address: this.form.value.address,
        educationLevel: this.form.value.educationLevel,
        school: this.form.value.school,
        graduationYear: this.form.value.graduationYear,
        jobTitle: this.form.value.jobTitle,
        employer: this.form.value.employer,
        yearsOfExperience: this.form.value.yearsOfExperience,
        skills: this.form.value.skills,
        additionalInfo: this.form.value.additionalInfo,
        userId: this.authService.getUserId()
      }
    }, 'confirm');
  }

  closeModal() {
    // Zatvaranje moda
    this.modalCtrl.dismiss({ role: 'cancel' });
  }

}
