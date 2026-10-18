import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ClaimService } from '../../../core/services/claim';
import { ScrubbingService } from '../../../core/services/scrubbing';

@Component({
  selector: 'app-scrubbing-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './scrubbing-list.html',
  styleUrl: './scrubbing-list.css',
})
export class ScrubbingList {
  constructor(
    public claimService: ClaimService,
    public scrubbingService: ScrubbingService,
  ) {}

  claimId: number | null = null;

  validateClaim() {
    if (!this.claimId) {
      alert('Please select a claim');
      return;
    }

    const claim = this.claimService.getClaims().find((item) => item.id === Number(this.claimId));

    if (!claim) {
      alert('Invalid claim selected');
      return;
    }

    const errors: string[] = [];

    if (!claim.patientName) {
      errors.push('Patient name is missing');
    }

    if (!claim.payerName) {
      errors.push('Insurance payer is missing');
    }

    if (!claim.icdCode) {
      errors.push('ICD-10 code is missing');
    }

    if (!claim.cptCode) {
      errors.push('CPT code is missing');
    }

    if (!claim.totalAmount || Number(claim.totalAmount) <= 0) {
      errors.push('Invalid claim amount');
    }

    const result = {
      claimId: claim.id,
      claimNumber: claim.claimNumber,
      patientName: claim.patientName,
      validationStatus: errors.length === 0 ? 'Passed' : 'Failed',
      errors: errors,
      validationDate: new Date().toISOString().split('T')[0],
    };

    this.scrubbingService.addResult(result);

    alert(
      errors.length === 0
        ? 'Claim validation passed!'
        : 'Claim validation failed. Please check errors.',
    );

    this.claimId = null;
  }

  deleteResult(id: number) {
    this.scrubbingService.deleteResult(id);
  }
}
