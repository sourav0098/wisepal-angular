import { Component,DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import ROLES from 'src/util/rolesList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements DoCheck{
  title = 'wise-pals-two';
  isTutor=false;
  isLogged=false;
  isMenuVisible=false;

  constructor(private route:Router){
    let roles=sessionStorage.getItem('roles');
    if(roles?.includes( ROLES.TUTOR.toString())){
      this.isTutor=true;
    }
  }
  ngDoCheck(): void {
    let currentroute = this.route.url;
    // let role=sessionStorage.getItem('roles');

    if (sessionStorage.getItem('accessToken')) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

    
    if (currentroute == '/login' || currentroute == '/register') {
      this.isMenuVisible = false
    } else {
      this.isMenuVisible = true
    }
  }
}
