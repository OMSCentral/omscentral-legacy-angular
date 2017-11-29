import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../firebase/auth.service';
import { ReviewService } from '../review.service';

@Component({
  selector: 'oms-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  @Input() review: any;
  authId: string;

  constructor(private auth: AuthService, private reviewService: ReviewService) {
    auth.user.subscribe(user => {
      this.authId = user.uid;
    }); }

  ngOnInit() {
  }

}
