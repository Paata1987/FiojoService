import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-company-part3',
  templateUrl: './add-company-part3.component.html',
  styleUrls: ['./add-company-part3.component.scss']
})
export class AddCompanyPart3Component implements OnInit {

   @Input() newCompanyModelUser!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
