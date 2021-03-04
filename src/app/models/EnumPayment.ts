import { Pipe, PipeTransform } from "@angular/core";

//  payment methods
export enum PaymentType {
  Card = 'House',
  Cash = 'Apartment',
  Credit = 'Flat',
  Invoice = 'Studio'
}

@Pipe({
  name: 'enumToArray'
})

export class EnumToArrayPipe implements PipeTransform {
  transform(data: Object) {
    const keys = Object.keys(data);
    return keys;
  }
}
