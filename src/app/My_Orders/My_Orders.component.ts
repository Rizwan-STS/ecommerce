import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { Constant } from '../../Constants';
import { CustomerOrderService } from './customer.order.service';
import { NotificationService } from 'wsuite-notification';

declare var $: any;
@Component({
  selector: 'app-My_Orders',
  templateUrl: './My_Orders.component.html',
  styleUrls: ['./My_Orders.component.scss'],
  providers: [CustomerOrderService]
})
export class MyOrdersComponent implements OnInit {

  productReviews: any;
  productsArray: any;

  displayedColumns: any = [];
  originalDisplayedColumns: string[];
  dataSource;
  sortBy;
  timeLeft: number = 10;
  cancelFalse: boolean = true;
  sortDirection;
  currentIndex;
  interval;
  sort: any;
  usersList;
  sortedData;
  screenWidth;
  imageWidth;
  imageHeight;
  counts = 0;
  rates: any = [1, 2, 3, 4, 5];
  ratingVal;
  comments;
  mainorderid;
  navigations = {
      navigationUrl : '/home',
      navigationName : 'Home',
  }
  constructor(private router: Router,
    private customerOrderService: CustomerOrderService, private appService: AppService
    , private toastr: NotificationService) { }

  ngOnInit() {
    this.imageWidth = '150px';
    this.imageHeight = '150px';
    this.screenWidth = screen.availWidth;
    if (this.screenWidth < 500) {
      this.imageWidth = '50px';
      this.imageHeight = '50px';
    }
    this.displayedColumns = ['id', 'drivername', 'product', 'boxNumber', 'promoCode', 'customername', 'status', 'action'];
    this.originalDisplayedColumns = ['id', 'drivername', 'product', 'boxNumber', 'promoCode', 'customername', 'status', 'action'];
    this.listService();
  }

  rating(id) {
    setTimeout(() => {
      $('#myModal1').modal("show")
    }, 1000);
    this.mainorderid = id;
    // const dialogRef = this.dialog.open(AllModalsModal, {
    //   width: '650px',
    //   height: 'auto',
    //   data: {
    //     isRating: true,
    //     mainorderid: id
    //   }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.listService();
    // });
  }

  onSaveRating() {
    // if (this.ratingForm.invalid || this.ratingForm.status !== 'VALID') {
    //   this.errorMessage = 'Please fill appropriate data in form as required.';
    //   return;
    // }
    Constant.ROOT_LOADER = true;

    let ratingForm = {
      rating: this.ratingVal,
      comments: this.comments
    }
    console.log('ratingForm is ', ratingForm);
    console.log('mainorderid is ', this.mainorderid);
    this.customerOrderService.saveRating(ratingForm, this.mainorderid).subscribe((data: any) => {
      // this.successMessage = 'Thanks for rating our service';
      const response = data;
      Constant.ROOT_LOADER = false;
      // this.ratingForm.reset();
      // this.snackBar.open(this.successMessage, '', Constant.SNACKBAR_DURATION);
      // this.closeDialog();
    }, (error) => {
      Constant.ROOT_LOADER = false;
      // this.errorMessage = error.error.message;
      this.toastr.success('Error!', error.error.message);
      window.scrollTo(0, 0);
    });

  }

  cancel(id) {
    Constant.ROOT_LOADER = true;
    this.customerOrderService.cancel(id).subscribe((data: any) => {
      // this.snackBar.open('Order is canceled successfully', '', Constant.SNACKBAR_DURATION);
      this.listService();
      setTimeout(() => {
        Constant.ROOT_LOADER = false;
      }, 500);
    });
  }

  CheckTiming(obj, index) {
    let dateTime = obj.createdDate.split(' ');
    let dt = dateTime[0].split('-')[1] + '/' + dateTime[0].split('-')[0] + '/' + dateTime[0].split('-')[2];
    dateTime = dt + ' ' + dateTime[1];
    const currentDate: any = new Date();
    const date: any = new Date(dateTime);
    const diff: any = Math.abs(currentDate - date);
    const minutes = Math.floor((diff / 1000) / 60);
    if (minutes < 1) {
      return true;
    } else {
      try {
        this.usersList.data[index].cancelOrder = false;
      } catch (e) {
        console.log(e);
      }
      /* if (!obj.cancelOrder) {
         this.counts += 1;
         if (this.counts % 10 === 0) {
           this.listService();
         }
       }*/
      return false;
    }
  }

  private listService() {
    Constant.ROOT_LOADER = true;
    this.customerOrderService.listing().subscribe((data: any) => {
      setTimeout(() => {
        Constant.ROOT_LOADER = false;
      }, 500);
      this.usersList = data;
      debugger;
      for (let i = 0; i < this.usersList.data.length; i++) {
        this.customerOrderService.orderById(this.usersList.data[i].id).subscribe((response: any) => {
          this.usersList.data[i].product = response.data;
          console.log('this.usersList is ', this.usersList);
          // this.interval = setInterval(() => {
          //   if (this.usersList.timeLeft > 0) {
          //     this.usersList.timeLeft--;
          //   } else {
          //     this.usersList.cancelFalse = false;
          //   }
          // }, 100)
        });
      }
    });
  }

}
