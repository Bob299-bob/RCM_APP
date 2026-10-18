import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PatientService } from '../../../core/services/patient';
import { InsuranceService } from '../../../core/services/insurance';
import { EligibilityService } from '../../../core/services/eligibility';

@Component({
  selector: 'app-eligibility-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './eligibility-list.html',
  styleUrl: './eligibility-list.css',
})
export class EligibilityList {
  constructor(
    public patientService: PatientService,
    public insuranceService: InsuranceService,
    public eligibilityService: EligibilityService,
  ) {}

  insuranceId: number | null = null;
  serviceType: string = 'Office Visit';
  requestDate: string = '';
  status: string = 'Pending';
  copay: number = 0;
  deductible: number = 0;
  notes: string = '';

  addEligibility() {
    if (!this.insuranceId || !this.requestDate) {
      alert('Please select insurance and request date');
      return;
    }

    const insurance = this.insuranceService
      .getInsurances()
      .find((item) => item.id === Number(this.insuranceId));

    if (!insurance) {
      alert('Please select a valid insurance policy');
      return;
    }

    const record = {
      patientId: insurance.patientId,
      patientName: insurance.patientName,
      insuranceId: insurance.id,
      providerName: insurance.providerName,
      policyNumber: insurance.policyNumber,
      serviceType: this.serviceType,
      requestDate: this.requestDate,
      status: this.status,
      copay: this.copay,
      deductible: this.deductible,
      notes: this.notes,
    };

    this.eligibilityService.addEligibility(record);

    alert('Eligibility record added successfully!');

    this.clearForm();
  }

  clearForm() {
    this.insuranceId = null;
    this.serviceType = 'Office Visit';
    this.requestDate = '';
    this.status = 'Pending';
    this.copay = 0;
    this.deductible = 0;
    this.notes = '';
  }

  deleteEligibility(id: number) {
    this.eligibilityService.deleteEligibility(id);
  }
}
