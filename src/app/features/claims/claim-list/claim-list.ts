import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ClaimService } from '../../../core/services/claim';
import { CodingService } from '../../../core/services/coding';
import { ChargeService } from '../../../core/services/charge';

@Component({
  selector: 'app-claim-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './claim-list.html',
  styleUrl: './claim-list.css',
})
export class ClaimList {
  constructor(
    public claimService: ClaimService,
    public codingService: CodingService,
    public chargeService: ChargeService,
  ) {}

  codingId: number | null = null;
  payerName: string = '';
  claimDate: string = '';
  status: string = 'Pending';
  notes: string = '';

  getSelectedCoding() {
    return this.codingService.getCodings().find((coding) => coding.id === Number(this.codingId));
  }

  getSelectedCharge() {
    const coding = this.getSelectedCoding();

    if (!coding) {
      return null;
    }

    return this.chargeService.getCharges().find((charge) => charge.id === coding.chargeId);
  }

  addClaim() {
    const coding = this.getSelectedCoding();
    const charge = this.getSelectedCharge();

    if (!coding || !charge || !this.payerName || !this.claimDate) {
      alert('Please enter all required details');
      return;
    }

    const claim = {
      claimNumber: 'CLM-' + String(this.claimService.nextId).padStart(4, '0'),
      codingId: coding.id,
      chargeId: charge.id,
      patientName: coding.patientName,
      diagnosis: coding.diagnosisName,
      icdCode: coding.icdCode,
      procedureName: coding.procedureName,
      cptCode: coding.cptCode,
      payerName: this.payerName,
      claimDate: this.claimDate,
      totalAmount: Number(charge.totalAmount),
      status: this.status,
      notes: this.notes,
    };

    this.claimService.addClaim(claim);

    alert('Claim created successfully!');

    this.clearForm();
  }

  clearForm() {
    this.codingId = null;
    this.payerName = '';
    this.claimDate = '';
    this.status = 'Pending';
    this.notes = '';
  }

  deleteClaim(id: number) {
    this.claimService.deleteClaim(id);
  }
}
