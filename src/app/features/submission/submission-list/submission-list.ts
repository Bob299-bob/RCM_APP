import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ClaimService } from '../../../core/services/claim';
import { ScrubbingService } from '../../../core/services/scrubbing';
import { SubmissionService } from '../../../core/services/submission';

@Component({
  selector: 'app-submission-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './submission-list.html',
  styleUrl: './submission-list.css',
})
export class SubmissionList {
  constructor(
    public claimService: ClaimService,
    public scrubbingService: ScrubbingService,
    public submissionService: SubmissionService,
  ) {}

  claimId: number | null = null;
  clearinghouseName: string = '';
  submissionDate: string = '';
  status: string = 'Submitted';

  getPassedClaims() {
    return this.claimService.getClaims().filter((claim) => {
      return this.scrubbingService
        .getResults()
        .some((result) => result.claimId === claim.id && result.validationStatus === 'Passed');
    });
  }

  submitClaim() {
    if (!this.claimId || !this.clearinghouseName || !this.submissionDate) {
      alert('Please enter all required details');
      return;
    }

    const claim = this.getPassedClaims().find((item) => item.id === Number(this.claimId));

    if (!claim) {
      alert('Only validated claims can be submitted');
      return;
    }

    const alreadySubmitted = this.submissionService
      .getSubmissions()
      .some((item) => item.claimId === claim.id);

    if (alreadySubmitted) {
      alert('This claim has already been submitted');
      return;
    }

    const submission = {
      claimId: claim.id,
      claimNumber: claim.claimNumber,
      patientName: claim.patientName,
      payerName: claim.payerName,
      totalAmount: claim.totalAmount,
      clearinghouseName: this.clearinghouseName,
      submissionDate: this.submissionDate,
      status: this.status,
      referenceNumber: 'SUB-' + String(this.submissionService.nextId).padStart(4, '0'),
    };

    this.submissionService.addSubmission(submission);

    alert('Claim submission record created successfully!');

    this.claimId = null;
    this.clearinghouseName = '';
    this.submissionDate = '';
    this.status = 'Submitted';
  }

  deleteSubmission(id: number) {
    this.submissionService.deleteSubmission(id);
  }
}
