import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SubmissionService } from '../../../core/services/submission';
import { AdjudicationService } from '../../../core/services/adjudication';

@Component({
  selector: 'app-adjudication-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './adjudication-list.html',
  styleUrl: './adjudication-list.css',
})
export class AdjudicationList {
  constructor(
    public submissionService: SubmissionService,
    public adjudicationService: AdjudicationService,
  ) {}

  submissionId: number | null = null;
  status: string = 'Pending';
  approvedAmount: number = 0;
  adjustmentAmount: number = 0;
  denialReason: string = '';
  responseDate: string = '';

  addAdjudication() {
    if (!this.submissionId || !this.responseDate) {
      alert('Please select a submission and response date');
      return;
    }

    const submission = this.submissionService
      .getSubmissions()
      .find((item) => item.id === Number(this.submissionId));

    if (!submission) {
      alert('Please select a valid submission');
      return;
    }

    const alreadyProcessed = this.adjudicationService
      .getAdjudications()
      .some((item) => item.submissionId === submission.id);

    if (alreadyProcessed) {
      alert('This submission already has an adjudication record');
      return;
    }

    if (
      this.status === 'Approved' &&
      (this.approvedAmount < 0 || this.approvedAmount > Number(submission.totalAmount))
    ) {
      alert('Approved amount must be between zero and the claim amount');
      return;
    }

    if (this.adjustmentAmount < 0) {
      alert('Adjustment amount cannot be negative');
      return;
    }

    const record = {
      submissionId: submission.id,
      referenceNumber: submission.referenceNumber,
      claimNumber: submission.claimNumber,
      patientName: submission.patientName,
      payerName: submission.payerName,
      claimAmount: Number(submission.totalAmount),
      status: this.status,
      approvedAmount: this.status === 'Approved' ? this.approvedAmount : 0,
      adjustmentAmount: this.adjustmentAmount,
      denialReason: this.status === 'Denied' ? this.denialReason : '',
      responseDate: this.responseDate,
    };

    this.adjudicationService.addAdjudication(record);

    alert('Adjudication record saved successfully!');

    this.clearForm();
  }

  clearForm() {
    this.submissionId = null;
    this.status = 'Pending';
    this.approvedAmount = 0;
    this.adjustmentAmount = 0;
    this.denialReason = '';
    this.responseDate = '';
  }

  deleteAdjudication(id: number) {
    this.adjudicationService.deleteAdjudication(id);
  }
}
