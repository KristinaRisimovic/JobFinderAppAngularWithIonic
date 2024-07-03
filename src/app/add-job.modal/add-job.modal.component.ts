import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth/auth.service";


@Component({
  selector: 'app-add-job.modal',
  templateUrl: './add-job.modal.component.html',
  styleUrls: ['./add-job.modal.component.scss'],
})
export class AddJobModalComponent  implements OnInit {

  // @ts-ignore
  @ViewChild("f", {static: true}) form: NgForm;
  constructor(private modalCtrl: ModalController, private authService: AuthService) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onAddJob() {
    if(this.form.invalid) {
      return;
    }
    this.modalCtrl.dismiss({jobData: {
        title: this.form.value['title'],
        companyName: this.form.value['companyName'],
        location: this.form.value['location'],
        workMode: this.form.value['workMode'],
        activeUntil: this.form.value['activeUntil'],
        description: this.form.value['description'],
        requiredTechnologies: this.form.value['requiredTechnologies'],
        status: 'Active',
        iconName:'bookmark-outline',
        user_id: this.authService.getUserId()
      }}, 'confirm');



  }

}
