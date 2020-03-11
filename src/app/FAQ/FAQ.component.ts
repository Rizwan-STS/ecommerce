import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
declare var $: any;

@Component({
  selector: 'app-FAQ',
  templateUrl: './FAQ.component.html',
  styleUrls: ['./FAQ.component.scss']
})
export class FAQComponent implements OnInit {

  constructor(private appService: AppService) { }

  faqData : any ={faqs:[]};
  faqDatas : any = [
      {
          'ques': '1 How to purchase the products in car?',
          'ans':'<p>You have to log in to <a href="http://www.ridekaart.com">www.ridekaart.com</a>.</p><p></p><ul><li>Enter the box number mentioned in the car.</li><li>Select the product you want to purchase and checkout.</li><li>The driver will get a msg on order delivery and will deliver the order when it is safe to do so</li></ul>'
      },
      {
          'ques': '2 What if the driver doesn’t get msg and I have made the purchase?',
          'ans':'You can show your order summary from your account in the website to claim your product.'
      },
      {
          'ques': '3 If the driver denies giving the product after purchase?',
          'ans':'You can reach us for any help or support on 9742046886'
      },
      {
          'ques': '4 Cancellation and Refund',
          'ans':'You can cancel your order within 30 seconds of making the purchase and in case time lapses then you can send an email to info@getridekaart.com and we will cancel the order for you. If any money deducted it will be refunded to your account within 7 working days.'
      },
  ];

  ngOnInit() {
    this.faqData.faqs = this.faqDatas;
  }
    toggleModal(id) {
        $("#" + id).slideToggle()
    }
}
