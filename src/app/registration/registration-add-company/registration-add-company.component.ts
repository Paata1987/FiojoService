import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { iCultures } from '@app/models/Cultures';
import { iLanguage } from '@app/models/iLanguage';
import { iUserRoles, UserRoles } from '@app/models/iUserRoles';
import { iRegistrationAuth } from '@app/models/Auth/RegistrationAuth';
import { AuthService } from '@app/services/auth.service';
import { RegistrationService } from '@app/services/registration.service';
import { trigger, state, transition, style, animate } from '@angular/animations';



@Component({
  selector: 'app-registration-add-company',
  templateUrl: './registration-add-company.component.html',
  styleUrls: ['./registration-add-company.component.scss'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('shown => hidden', animate('600ms')),
      transition('hidden => shown', animate('300ms')),
    ])
  ]
})
export class RegistrationAddCompanyComponent implements OnInit {

  public saveModalOpened: boolean = false;
  public progressValue: number = 40;
  public progressCompanySuccess: boolean = false;
  public rolesList: iUserRoles[] = [];
  public languageList: iLanguage[] = [];
  public nameCheckValue: string = '';
  submitted = false;

  public cultureList: iCultures[] = [];
  registrationUserForm: FormGroup;
  public registered: boolean=false;
  visiblityState = 'hidden';



  constructor(private authService: AuthService, private registrationService: RegistrationService, private fb: FormBuilder) {
    this.rolesGet();
    this.cultureGet();
    this.languageGet();

    this.registrationUserForm = this.fb.group({
      userName: new FormControl('', Validators.pattern(/^(?=[A-Za-z]\w*)(?=[^a-z]*[a-z])[A-Za-z\d\-az!$%_@#£€*?&/]{4,24}$/)), //  start with letter[length from 4 to 24 characters]
      password: new FormControl('', Validators.pattern(/^(?=[^A-Z]*[A-Z]\w*)(?=[^a-z]*[a-z])(?=\D*\d)[A-Za-z\d\-az!$%@#_£€*?/&]{6,24}$/)), // must contain min: 1 [digit, small letter, capital letter] lenght 6-24 charachters
      userCulture: new FormControl(this.cultureList[2], Validators.required),
      userRoles: new FormControl(this.rolesList[2], Validators.required),
      language: new FormControl(this.languageList[2], Validators.required),
      firstName: new FormControl('', Validators.pattern(/^(?=[A-Za-z]\w*)(?=[^a-z]*[a-z])[A-Za-z\d\-az!$%_@#£€*?&/]{4,24}$/)), //  start with letter[length from 4 to 24 characters]
      lastName: new FormControl('', Validators.pattern(/^(?=[A-Za-z]\w*)(?=[^a-z]*[a-z])[A-Za-z\d\-az!$%_@#£€*?&/]{4,24}$/)), //  start with letter[length from 4 to 24 characters]
      groupName: new FormControl('', Validators.pattern(/^(?=[A-Za-z]\w*)(?=[^a-z]*[a-z])[A-Za-z\d\-az!$%_@#£€*?&/]{4,24}$/)), //  start with letter[length from 4 to 24 characters]
      phones: new FormControl("+47", Validators.required)

    });
  }


  ngOnInit(): void {
    //this.registrationUserForm.controls.userRoles.setValue(this.rolesList[2])
  }

  onFormSubmit() {
    //.saveEmployee(this.registrationUserForm.value);
    this.saveModalOpened = true;

  }
  public SetRegisterUserAuth() {
    this.saveModalOpened = false;
    let user = this.registrationUserForm.value;

    // step 1 add user to Auth server
    let AuthRegistration: iRegistrationAuth = {
      Username: this.registrationUserForm.controls["userName"].value,
      Password: this.registrationUserForm.controls["password"].value,
      CultureCode: this.registrationUserForm.controls["userCulture"].value.Code,
      LanguageCode: this.registrationUserForm.controls["language"].value.Code,
      RoleId: this.registrationUserForm.controls["userRoles"].value
    };

    this.registrationService.SetRegistrationAuth(AuthRegistration)
      .subscribe((res: any) => {
        if (this.visiblityState === 'hidden')
          this.visiblityState = 'shown';
        else
          this.visiblityState = 'hidden';
        this.resetForm();
      } );

   

  }

  private resetForm() {
    this.registrationUserForm.reset();
  }

  public userCheck() {
    this.authService.CheckUserName(this.nameCheckValue).subscribe((res: Response) => {
      alert("name is Ok");
    }, error => {
      alert("Try again");
    }
    );
  }
  private rolesGet() {
    this.registrationService.GetRoles().subscribe(response => {
      this.rolesList = response;
    });
  }

  private cultureGet() {
    this.cultureList = this.registrationService.GetCultures();

  }

  private languageGet() {
    this.languageList = this.registrationService.GetLanguages();
  }



  public addPhone() {
    (<FormArray>this.registrationUserForm.controls["phones"]).push(new FormControl("", Validators.required));
  }
  public deletePhone() { }

}
