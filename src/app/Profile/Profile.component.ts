import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { UserProfileService } from './user-profile.service';
import { Constant } from '../../Constants';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-Profile',
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.scss'],
  providers: [UserProfileService, DatePipe]
})
export class ProfileComponent implements OnInit {

  genders: any[] = ['Male', 'Female'];
  users;
  name;
  dob;
  email;
  gender;
  constructor(private appService: AppService,
    public datepipe: DatePipe,
    public userProfileService: UserProfileService) { }

  ngOnInit() {
    this.getDetails();
  }

  getDetails() {
    this.userProfileService.getDetails().subscribe((data: any) => {
      // this.successMessage = data.message;
      const response = data;
      Constant.ROOT_LOADER = false;
      if (response && response.data) {
        this.users = response.data;
        console.log(this.users);
        this.name =  this.users.name;
        this.dob =  this.datepipe.transform(this.users.dob, 'yyyy-MM-dd');
        this.email =  this.users.email;
        this.gender =  this.users.gender;
      }
    }, (error) => {
      Constant.ROOT_LOADER = false;
      // this.errorMessage = error.error.message;
    });
  }
  submitForm() {
    // if (this.myProfileForm.invalid || this.myProfileForm.status !== 'VALID') {
    //   return;
    // }
    let myProfileForm = {
      name: this.name,
      dob: this.dob,
      email: this.email,
      gender: this.gender
    }
    
    Constant.ROOT_LOADER = true;
    this.userProfileService.updateDetails(myProfileForm).subscribe((data: any) => {
      // this.successMessage = data.message;
      const response = data;
      Constant.ROOT_LOADER = false;
      if (response && response.data) {
        this.users = response.data;
       
        // this.saveBannerImage();
      }
    }, (error) => {
      Constant.ROOT_LOADER = false;
      // this.errorMessage = error.error.message;
    });
  }

}
