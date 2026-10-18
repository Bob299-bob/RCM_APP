import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../../core/services/patient';
import { InsuranceService } from '../../../core/services/insurance';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insurance-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './insurance-list.html',
  styleUrl: './insurance-list.css',
})
export class InsuranceList {
  constructor(
    public patientService: PatientService,
    public insuranceService: InsuranceService,
    private router: Router,
  ) {}

  patientId: number | null = null;
  providerName: string = '';
  policyNumber: string = '';
  groupNumber: string = '';
  planType: string = 'PPO';
  startDate: string = '';
  endDate: string = '';

  addInsurance() {
    if (
      !this.patientId ||
      !this.providerName ||
      !this.policyNumber ||
      !this.startDate ||
      !this.endDate
    ) {
      alert('Please enter all required details');
      return;
    }

    const patient = this.patientService.getPatients().find((p) => p.id === Number(this.patientId));

    if (!patient) {
      alert('Please select a registered patient');
      return;
    }

    const insurance = {
      patientId: patient.id,
      patientName: patient.firstName + ' ' + patient.lastName,
      providerName: this.providerName,
      policyNumber: this.policyNumber,
      groupNumber: this.groupNumber,
      planType: this.planType,
      startDate: this.startDate,
      endDate: this.endDate,
    };

    this.insuranceService.addInsurance(insurance);

    alert('Insurance added successfully!');

    this.clearForm();
    this.router.navigate(['/eligibility']);
  }

  clearForm() {
    this.patientId = null;
    this.providerName = '';
    this.policyNumber = '';
    this.groupNumber = '';
    this.planType = 'PPO';
    this.startDate = '';
    this.endDate = '';
  }

  deleteInsurance(id: number) {
    this.insuranceService.deleteInsurance(id);
  }
}
