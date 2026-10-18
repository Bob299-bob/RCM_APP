import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BillingService } from '../../../core/services/billing';
import { ARManagementService } from '../../../core/services/ar-management';

@Component({
  selector: 'app-ar-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ar-list.html',
  styleUrl: './ar-list.css',
})
export class ArList {
  billingService = inject(BillingService);
  arService = inject(ARManagementService);

  billId: number | null = null;
  followUpDate: string = '';
  agingBucket: string = '0-30 Days';
  status: string = 'Open';
  notes: string = '';

  message: string = '';

  // Only unpaid or partially paid bills
  getAvailableBills() {
    return this.billingService
      .getBills()
      .filter(
        (bill) =>
          bill.paymentStatus !== 'Paid' &&
          !this.arService.getRecords().some((record) => record.billId === bill.id),
      );
  }

  addARRecord() {
    if (!this.billId || !this.followUpDate) {
      this.message = 'Please select a bill and follow-up date.';
      return;
    }

    const bill = this.billingService.getBills().find((item) => item.id === Number(this.billId));

    if (!bill) {
      this.message = 'Bill not found.';
      return;
    }

    this.arService.addRecord({
      billId: bill.id,
      claimNumber: bill.claimNumber,
      patientName: bill.patientName,
      payerName: bill.payerName,
      balance: Number(bill.patientResponsibility),
      dueDate: bill.dueDate,
      followUpDate: this.followUpDate,
      agingBucket: this.agingBucket,
      status: this.status,
      notes: this.notes,
    });

    this.message = 'AR record added successfully!';

    this.billId = null;
    this.followUpDate = '';
    this.agingBucket = '0-30 Days';
    this.status = 'Open';
    this.notes = '';
  }

  updateStatus(record: any, newStatus: string) {
    record.status = newStatus;
  }

  deleteRecord(id: number) {
    this.arService.deleteRecord(id);
  }
}
