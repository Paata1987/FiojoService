import { iLocationsModel } from '@app/models/iLocationModel';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {

  @Input() public regNewLocation: iLocationsModel = {
    ApartmentsNumber:"", City:"", Country:"", Index:"", LocationOrStreetName:"", Municipality:"", Region:"", StreetNumber:""
  };
  @Output() public inpOutLocationModel = new EventEmitter();

  vertical:string="";


  public cTypes:string[]=["Akaka","Makaka"];


  constructor() { }

  ngOnInit(): void {
    this.inpOutLocationModel.emit(this.regNewLocation)
  }



  private closeLocationWindows() {

  }

/**
 * TypeCo
 */
public TypeCo(ii:any) {

}






/**
 * SubmitLocation
 */
public SubmitLocation() {

}


  /**
   * CancelAddLocation
   */
  public CancelAddLocation() {

  }
}

