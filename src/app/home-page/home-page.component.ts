import { Component, OnInit } from '@angular/core';
import { iUserIdentity } from '@app/models/iUserIdentity';
import { AuthService } from '@app/services/auth.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public isLoggedOut: boolean = false;
  public textInfo: string = "User Logged In";
  public infoType: string = "info";
  public userIdentity!: iUserIdentity;

  constructor(private authService: AuthService) {
    this.userInfo();
   }

  ngOnInit(): void {
  }

  private userInfo() {
    
    this.isLoggedOut = this.authService.IsAuthorized(); 
    this.userIdentity = this.authService.GetIdentity();

    this.textInfo = this.isLoggedOut ? "User Logged In!   ID: " + this.userIdentity.Id : "You have to Log In";
    this.infoType = this.isLoggedOut ? "info" : "warning";   
  }
}
