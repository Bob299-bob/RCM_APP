import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdjudicationService } from '../../../core/services/adjudication';
import { PaymentService } from '../../../core/services/payment';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './payment-list.html',
  styleUrl: './payment-list.css',
})
export class PaymentList {
  constructor(
    public adjudicationService: AdjudicationService,
    public paymentService: PaymentService,
  ) {}

  adjudicationId: number | null = null;
  paidAmount: number = 0;
  adjustmentAmount: number = 0;
  paymentDate: string = '';
  paymentMethod: string = 'EFT';
  checkNumber: string = '';
  eraNumber: string = '';

  getApprovedRecords() {
    return this.adjudicationService
      .getAdjudications()
      .filter((record) => record.status === 'Approved');
  }

  getSelectedRecord() {
    return this.getApprovedRecords().find((record) => record.id === Number(this.adjudicationId));
  }

  addPayment() {
    const record = this.getSelectedRecord();

    if (!record || !this.paymentDate || this.paidAmount <= 0) {
      alert('Please enter all required details');
      return;
    }

    if (this.paidAmount > record.approvedAmount) {
      alert('Payment cannot be greater than the approved amount');
      return;
    }

    const alreadyPaid = this.paymentService
      .getPayments()
      .some((payment) => payment.adjudicationId === record.id);

    if (alreadyPaid) {
      alert('Payment is already recorded for this claim');
      return;
    }

    const payment = {
      adjudicationId: record.id,
      claimNumber: record.claimNumber,
      patientName: record.patientName,
      payerName: record.payerName,
      claimAmount: record.claimAmount,
      approvedAmount: record.approvedAmount,
      paidAmount: this.paidAmount,
      adjustmentAmount: this.adjustmentAmount,
      paymentDate: this.paymentDate,
      paymentMethod: this.paymentMethod,
      checkNumber: this.checkNumber,
      eraNumber: this.eraNumber,
    };

    this.paymentService.addPayment(payment);

    alert('Payment posted successfully!');

    this.clearForm();
  }

  clearForm() {
    this.adjudicationId = null;
    this.paidAmount = 0;
    this.adjustmentAmount = 0;
    this.paymentDate = '';
    this.paymentMethod = 'EFT';
    this.checkNumber = '';
    this.eraNumber = '';
  }

  deletePayment(id: number) {
    this.paymentService.deletePayment(id);
  }
}
