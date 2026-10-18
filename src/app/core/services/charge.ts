import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChargeService {
  charges: any[] = [];
  nextId: number = 1;

  addCharge(data: any) {
    const charge = {
      id: this.nextId++,
      ...data,
    };

    this.charges.push(charge);
  }

  getCharges() {
    return this.charges;
  }

  deleteCharge(id: number) {
    this.charges = this.charges.filter((charge) => charge.id !== id);
  }

  getTotalCharges() {
    return this.charges.length;
  }

  getTotalAmount() {
    return this.charges.reduce((total, charge) => total + Number(charge.amount), 0);
  }
}
