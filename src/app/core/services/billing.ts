import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  bills: any[] = [];
  nextId: number = 1;

  addBill(data: any) {
    const bill = {
      id: this.nextId++,
      ...data,
    };

    this.bills.push(bill);
  }

  getBills() {
    return this.bills;
  }

  deleteBill(id: number) {
    const index = this.bills.findIndex((bill) => bill.id === id);

    if (index !== -1) {
      this.bills.splice(index, 1);
    }
  }

  getTotalBills() {
    return this.bills.length;
  }

  getTotalPatientResponsibility() {
    return this.bills.reduce((total, bill) => total + Number(bill.patientResponsibility), 0);
  }
}
