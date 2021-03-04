import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '@app/services/spinner.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent  {

  public color:string = 'primary';

  public value:number = 50;
  public isLoading: Subject<boolean> = this.spinnerService.isLoading;
  constructor(private spinnerService: SpinnerService){}
}
