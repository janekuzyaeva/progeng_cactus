import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/firestore/orders/orders.service';

@Component({
  selector: 'app-current-orders-carrier',
  templateUrl: './current-orders-carrier.component.html',
  styleUrls: ['./current-orders-carrier.component.css']
})
export class CurrentOrdersCarrierComponent implements OnInit {

  orders: any = [{}];

  constructor(
    public db: OrdersService,
  ) { }

  ngOnInit(): void {
    this.db.getCarrierOrders(JSON.parse(localStorage.getItem('userData')).uid).subscribe( data =>{
      this.orders = data.map( e => {
        return this.setOrders(e);
      })
    })
  }

  newStatus(order_id: string, order_status: string){
      console.log( order_status, order_id)
      if (order_status == 'Выехали за посылкой'){
      console.log( order_status, order_id)
      this.db.updateOrder(order_id, {status: 'Доставляется'});
    }else
    if (order_status == 'Доставляется'){
      console.log( order_status, order_id)
      this.db.updateOrder(order_id, {status: 'Доставлено'});
    }
  }

  setOrders(e){
    let orders = {
      id: e.payload.doc.id,
      data: e.payload.doc.get('data'),
      phone_sender: e.payload.doc.get('phone_sender'),
      name_sender: e.payload.doc.get('name_sender'),
      name_recipient: e.payload.doc.get('name_recipient'),
      phone_recipient: e.payload.doc.get('phone_recipient'),
      address_recipient: e.payload.doc.get('address_recipient'),
      address_sender: e.payload.doc.get('address_sender'),
      status: e.payload.doc.get('status'),
    }
    return orders;
  }

}
