export class CouponDto {
  id= '';
  name= '';
  code= '';
  offerType= '';
  offerUseCount= 0;
  discount= new Discount();
  isActive= false;
}

export class Discount {
  value= 0;
  valueType= 'Rate';
}
class getCouponByNameDto {
  id= '';
  name= '';
}
export class getCouponByIdDto {
  id= '';
  name= '';
  code= '';
  discount=  new Discount();
  offerOn= 'Branch';
  offerType= 'Branch';
  limit= 0;
  dateTimeRange=  new DateTimeRange();
  baseOrderAmount= 0;
  description= '';
  customerId= '';
  branchId= '';
  productIds= <any>[];
}

export class DateTimeRange {
  start= '';
  end= '';
}
