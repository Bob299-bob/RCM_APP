import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  payments: any[] = [];
  nextId: number = 1;

  addPayment(data: any) {
    const payment = {
      id: this.nextId++,
      ...data,
    };

    this.payments.push(payment);
  }

  getPayments() {
    return this.payments;
  }

  deletePayment(id: number) {
    const index = this.payments.findIndex((payment) => payment.id === id);

    if (index !== -1) {
      this.payments.splice(index, 1);
    }
  }

  getTotalPayments() {
    return this.payments.reduce((total, payment) => total + Number(payment.paidAmount), 0);
  }
}
