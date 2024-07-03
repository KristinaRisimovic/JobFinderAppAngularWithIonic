import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyProfileModalComponent } from '../my-profile-modal/my-profile-modal.component';
import { ModalController } from '@ionic/angular';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './myProfile.page.html',
  styleUrls: ['./myProfile.page.scss']
})
export class MyProfilePage implements OnInit {
  profileForm: FormGroup;

  userProfileData: any = {}; // Objekat za čuvanje podataka korisnika

  constructor(private fb: FormBuilder, private modalController: ModalController,
    private userService: UserService) { }

  ngOnInit(): void {
   
    this.initProfileForm();
    //this.loadUserData();
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
      yearsOfExperience: ['22'],
      skills: ['s'],
      additionalInfo: ['none']
    });
  }

  loadUserData() {
    this.userService.getUserData().subscribe(data => {
      if (data) {
        console.log('Postoje ucitani podaci o user-u');
        this.userProfileData = data;
        this.patchProfileForm(this.userProfileData);
      } else {
        console.log('NE postoje ucitani podaci o user-u');

        this.userProfileData = {}; // Ako nema podataka, postavi prazan objekat
        // Otvori modal za unos podataka
        this.openEditProfileModal();
      }
    });
  }

  //popunjava formu podacima iz baze
  patchProfileForm(userData: any) {
    this.profileForm.patchValue({
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      phone: userData.phone || '',
      address: userData.address || '',
      educationLevel: userData.educationLevel || '',
      school: userData.school || '',
      graduationYear: userData.graduationYear || '',
      jobTitle: userData.jobTitle || '',
      employer: userData.employer || '',
      yearsOfExperience: userData.yearsOfExperience || '',
      skills: userData.skills || '',
      additionalInfo: userData.additionalInfo || ''
    });
  }

  async openEditProfileModal() {
    const modal = await this.modalController.create({
      component: MyProfileModalComponent,
      componentProps: { userData: this.userProfileData }
    });
    await modal.present();
  
    modal.onDidDismiss().then((resultData) => {
      if (resultData.role === 'confirm') {
        this.patchProfileForm(resultData.data.userData);
        this.saveProfileChanges(resultData.data.userData); 
      }
    });
  }

  saveProfileChanges(userData: any) {
    // Čuvanje podataka u Firebase ili drugu bazu
    this.userService.saveUserData(userData).subscribe(
      () => {
        console.log('Podaci su uspešno sačuvani!');
      },
      error => {
      
        console.error('Došlo je do greške prilikom čuvanja podataka:', error);
      }
    );
  }
  

   onSubmit() {
    if (this.profileForm.valid) {
      // Možete dodati dodatnu logiku pre slanja podataka
      this.saveProfileChanges(this.profileForm.value);
    } else {
      console.log('Molimo popunite ispravno sva obavezna polja forme.');
    }
  }
}
