import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { UserProfileService } from './user-profile.service';
import { Constant } from '../../Constants';
import { DatePipe } from '@angular/common';
import { NotificationService } from 'wsuite-notification';

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
  successMessage;
  errorMessage = '';
    navigations = {
        navigationUrl : '/home',
        navigationName : 'Home',
    }
  constructor(private appService: AppService,
    public datepipe: DatePipe,
    public userProfileService: UserProfileService, private toastr: NotificationService) { }

  ngOnInit() {
    this.getDetails();
  }

  getDetails() {
    this.userProfileService.getDetails().subscribe((data: any) => {
      // this.successMessage = data.message;
      this.toastr.success('Success!', data.message);
      // data.message = 'Profile updated successfully!'
      // this.successMessage = data.message;
      // this.errorMessage = '';
      const response = data;
      Constant.ROOT_LOADER = false;
      if (response && response.data) {
        this.users = response.data;
        console.log(this.users);
        this.name = this.users.name;
        this.dob = this.datepipe.transform(this.users.dob, 'yyyy-MM-dd');
        this.email = this.users.email;
        this.gender = this.users.gender;
      }
    }, (error) => {
      Constant.ROOT_LOADER = false;
      this.toastr.success('Error!', error.error.message);
      this.successMessage = '';
        this.errorMessage = error.error.message;
      // this.errorMessage = error.error.message;
    });
  }
  submitForm() {
    // if (this.myProfileForm.invalid || this.myProfileForm.status !== 'VALID') {
    //   return;
    // }
    let dateString = this.dob 
    let newDate = new Date(dateString);
    console.log(newDate);
    let myProfileForm = {
      name: this.name,
      dob: newDate,
      email: this.email,
      gender: this.gender
    }

    Constant.ROOT_LOADER = true;
    this.userProfileService.updateDetails(myProfileForm).subscribe((data: any) => {
      // this.successMessage = data.message;
      // this.toastr.success('Success!', data.message);
      data.message = 'Profile updated successfully!'
      this.successMessage = data.message;
      this.errorMessage = '';
      const response = data;
      Constant.ROOT_LOADER = false;
      if (response && response.data) {
        this.users = response.data;
        this.getDetails();
        // this.saveBannerImage();
      }
    }, (error) => {
      Constant.ROOT_LOADER = false;
      // this.toastr.success('Error!', error.error.message);
      this.successMessage = '';
        this.errorMessage = 'Please enter correct date format';
      // this.errorMessage = error.error.message;
    });
  }

}
