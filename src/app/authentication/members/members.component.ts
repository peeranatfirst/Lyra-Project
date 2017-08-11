import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../../router.animation';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]':''}
})
export class MembersComponent implements OnInit {

  name: any;
  user: any;
  state: string = '';

  constructor(public af: AngularFire,private router: Router) {

  }

  

  ngOnInit() {
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth.auth.displayName;
        this.user = auth.auth.photoURL;
      }
    });
  }

}
