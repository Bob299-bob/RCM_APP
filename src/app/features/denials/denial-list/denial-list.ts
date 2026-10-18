import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdjudicationService } from '../../../core/services/adjudication';
import { DenialService } from '../../../core/services/denial';

@Component({
  selector: 'app-denial-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './denial-list.html',
  styleUrl: './denial-list.css',
})
export class DenialList {
  constructor(
    public adjudicationService: AdjudicationService,
    public denialService: DenialService,
  ) {}

  adjudicationId: number | null = null;
  denialReason: string = '';
  denialCode: string = '';
  denialDate: string = '';
  appealStatus: string = 'Pending';
  appealDate: string = '';
  appealNotes: string = '';

  getDeniedRecords() {
    return this.adjudicationService
      .getAdjudications()
      .filter((record) => record.status === 'Denied');
  }

  addDenial() {
    if (!this.adjudicationId || !this.denialReason || !this.denialCode || !this.denialDate) {
      alert('Please enter all required details');
      return;
    }

    const record = this.getDeniedRecords().find((item) => item.id === Number(this.adjudicationId));

    if (!record) {
      alert('Please select a valid denied claim');
      return;
    }

    const alreadyExists = this.denialService
      .getDenials()
      .some((denial) => denial.adjudicationId === record.id);

    if (alreadyExists) {
      alert('Denial record already exists for this claim');
      return;
    }

    const denial = {
      adjudicationId: record.id,
      claimNumber: record.claimNumber,
      patientName: record.patientName,
      payerName: record.payerName,
      claimAmount: record.claimAmount,
      denialReason: this.denialReason,
      denialCode: this.denialCode,
      denialDate: this.denialDate,
      appealStatus: this.appealStatus,
      appealDate: this.appealDate,
      appealNotes: this.appealNotes,
    };

    this.denialService.addDenial(denial);

    alert('Denial record created successfully!');

    this.clearForm();
  }

  updateAppeal(id: number, status: string) {
    const denial = this.denialService.getDenials().find((item) => item.id === id);

    if (denial) {
      denial.appealStatus = status;
    }
  }

  deleteDenial(id: number) {
    this.denialService.deleteDenial(id);
  }

  clearForm() {
    this.adjudicationId = null;
    this.denialReason = '';
    this.denialCode = '';
    this.denialDate = '';
    this.appealStatus = 'Pending';
    this.appealDate = '';
    this.appealNotes = '';
  }
}
