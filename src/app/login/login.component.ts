import { first } from 'rxjs/operators';
import { ServerToken } from '@app/models/ServerToken';


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { LoginUserModel } from '@app/models/Auth/loginUser';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private IsAuthorized: boolean = false;
  public formSubmitted: boolean = false;

  public usrNameChanges!: string;
  public usrNameStatus!: string;
  private returnUrl: string = this.route.snapshot.queryParams.returnUrl || 'registration';
  private Token: ServerToken = new ServerToken();
  //form: FormGroup;
  public loginInvalid: boolean = false;

  public userForm: FormGroup = new FormGroup({
    userName: new FormControl('Mahmud', Validators.pattern(/^(?=[A-Za-z]\w*)(?=[^a-z]*[a-z])[A-Za-z\d\-az!$%_@#£€*?&/]{4,24}$/)), //  start with letter[lenght from 4 to 24 characters]
    password: new FormControl("Mahmud83" , Validators.pattern(/^(?=[^A-Z]*[A-Z]\w*)(?=[^a-z]*[a-z])(?=\D*\d)[A-Za-z\d\-az!$%@#_£€*?/&]{6,24}$/)) // must contain min: 1 [digit, small letter, capital letter] lenght 6-24 charachters
  });


  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.currentState();
  }
  ngOnInit(): void { }


  get userName(): any {
    return this.userForm.get('userName');
  }

  get password() {
    return this.userForm.get('password')
  }

  private currentState() {   
    this.IsAuthorized = this.authService.IsAuthorized();   
    if (this.IsAuthorized) this.router.navigate([this.returnUrl]);   
  }

  private resetForm() {
    this.userForm.reset();
  }
  //ToDo  edit to async
  public async onFormSubmit() {

    this.loginInvalid = false;    

    if (this.userForm.valid) {
      this.formSubmitted = true;
      try {
        let loginModel: LoginUserModel = new LoginUserModel(
          this.userForm.controls['userName'].value.replace(/\s/g, ""), // this.userForm.get('userName').value;
         this.userForm.controls['password'].value.replace(/\s/g, "")) // this.userForm.get('password').value;
        
        this.loginInvalid = false;

        //ToDo   await
       await this.authService.Login(loginModel)
          // this.authService.Login("aida", "Aida123")
          .pipe(first())
          .subscribe(
            data => {
              //console.log("data= " +data.access_Token);
              this.Token = data;
              console.log("Token = " + this.Token.access_Token);
              this.authService.SetToken(this.Token.access_Token)

              this.router.navigate([this.returnUrl]);
              setTimeout(function(){
                window.location.reload(); }, 2000);

            });
      } catch (err) {
        this.loginInvalid = true;
      }

      this.resetForm();
    } else {
      this.formSubmitted = false;
      this.loginInvalid = true;

      // this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/registration';

      //ToDo   await
     await this.router.navigate([this.returnUrl]);
    }
  }




}


