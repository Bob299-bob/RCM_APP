import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdjudicationService } from '../../../core/services/adjudication';
import { PaymentService } from '../../../core/services/payment';
import { BillingService } from '../../../core/services/billing';

@Component({
  selector: 'app-billing-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './billing-list.html',
  styleUrl: './billing-list.css',
})
export class BillingList {
  constructor(
    public adjudicationService: AdjudicationService,
    public paymentService: PaymentService,
    public billingService: BillingService,
  ) {}

  adjudicationId: number | null = null;
  patientResponsibility: number = 0;
  dueDate: string = '';
  billDate: string = '';
  paymentStatus: string = 'Unpaid';

  getApprovedRecords() {
    return this.adjudicationService
      .getAdjudications()
      .filter((record) => record.status === 'Approved');
  }

  getSelectedRecord() {
    return this.getApprovedRecords().find((record) => record.id === Number(this.adjudicationId));
  }

  getInsurancePaidAmount() {
    const record = this.getSelectedRecord();

    if (!record) {
      return 0;
    }

    const payment = this.paymentService
      .getPayments()
      .find((item) => item.adjudicationId === record.id);

    return payment ? Number(payment.paidAmount) : 0;
  }

  addBill() {
    const record = this.getSelectedRecord();

    if (!record || !this.billDate || !this.dueDate || this.patientResponsibility < 0) {
      alert('Please enter all required details');
      return;
    }

    const alreadyExists = this.billingService
      .getBills()
      .some((bill) => bill.adjudicationId === record.id);

    if (alreadyExists) {
      alert('Bill already exists for this claim');
      return;
    }

    const bill = {
      adjudicationId: record.id,
      claimNumber: record.claimNumber,
      patientName: record.patientName,
      payerName: record.payerName,
      claimAmount: Number(record.claimAmount),
      insurancePaid: this.getInsurancePaidAmount(),
      patientResponsibility: this.patientResponsibility,
      billDate: this.billDate,
      dueDate: this.dueDate,
      paymentStatus: this.paymentStatus,
    };

    this.billingService.addBill(bill);

    alert('Patient bill created successfully!');

    this.clearForm();
  }

  clearForm() {
    this.adjudicationId = null;
    this.patientResponsibility = 0;
    this.dueDate = '';
    this.billDate = '';
    this.paymentStatus = 'Unpaid';
  }

  deleteBill(id: number) {
    this.billingService.deleteBill(id);
  }
}
