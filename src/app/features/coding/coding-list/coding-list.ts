import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ChargeService } from '../../../core/services/charge';
import { CodingService } from '../../../core/services/coding';

@Component({
  selector: 'app-coding-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './coding-list.html',
  styleUrl: './coding-list.css',
})
export class CodingList {
  constructor(
    public chargeService: ChargeService,
    public codingService: CodingService,
  ) {}

  chargeId: number | null = null;
  diagnosisName: string = '';
  icdCode: string = '';
  procedureName: string = '';
  cptCode: string = '';
  codingDate: string = '';
  coderName: string = '';
  status: string = 'Pending';
  notes: string = '';

  addCoding() {
    if (
      !this.chargeId ||
      !this.diagnosisName ||
      !this.icdCode ||
      !this.procedureName ||
      !this.cptCode ||
      !this.codingDate ||
      !this.coderName
    ) {
      alert('Please enter all required details');
      return;
    }

    const charge = this.chargeService
      .getCharges()
      .find((item) => item.id === Number(this.chargeId));

    if (!charge) {
      alert('Please select a valid charge');
      return;
    }

    const coding = {
      chargeId: charge.id,
      patientName: charge.patientName,
      serviceName: charge.serviceName,
      diagnosisName: this.diagnosisName,
      icdCode: this.icdCode,
      procedureName: this.procedureName,
      cptCode: this.cptCode,
      codingDate: this.codingDate,
      coderName: this.coderName,
      status: this.status,
      notes: this.notes,
    };

    this.codingService.addCoding(coding);

    alert('Medical coding record saved successfully!');

    this.clearForm();
  }

  clearForm() {
    this.chargeId = null;
    this.diagnosisName = '';
    this.icdCode = '';
    this.procedureName = '';
    this.cptCode = '';
    this.codingDate = '';
    this.coderName = '';
    this.status = 'Pending';
    this.notes = '';
  }

  deleteCoding(id: number) {
    this.codingService.deleteCoding(id);
  }
}
