import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PatientService } from '../../../core/services/patient';
import { InsuranceService } from '../../../core/services/insurance';
import { AuthorizationService } from '../../../core/services/authorization';

@Component({
  selector: 'app-authorization-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './authorization-list.html',
  styleUrl: './authorization-list.css',
})
export class AuthorizationList {
  constructor(
    public patientService: PatientService,
    public insuranceService: InsuranceService,
    public authorizationService: AuthorizationService,
  ) {}

  patientId: number | null = null;
  insuranceId: number | null = null;
  serviceType: string = 'Surgery';
  procedureName: string = '';
  requestDate: string = '';
  providerName: string = '';
  referralRequired: string = 'Yes';
  status: string = 'Pending';
  notes: string = '';

  // Show insurance policies for selected patient
  getPatientInsurances() {
    return this.insuranceService
      .getInsurances()
      .filter((insurance) => insurance.patientId === Number(this.patientId));
  }

  addAuthorization() {
    if (
      !this.patientId ||
      !this.insuranceId ||
      !this.serviceType ||
      !this.procedureName ||
      !this.requestDate ||
      !this.providerName
    ) {
      alert('Please enter all required details');
      return;
    }

    const patient = this.patientService.getPatients().find((p) => p.id === Number(this.patientId));

    const insurance = this.insuranceService
      .getInsurances()
      .find((i) => i.id === Number(this.insuranceId) && i.patientId === Number(this.patientId));

    if (!patient || !insurance) {
      alert('Please select a valid patient and insurance policy');
      return;
    }

    const authorization = {
      patientId: patient.id,
      patientName: patient.firstName + ' ' + patient.lastName,
      insuranceId: insurance.id,
      insuranceProvider: insurance.providerName,
      policyNumber: insurance.policyNumber,
      serviceType: this.serviceType,
      procedureName: this.procedureName,
      requestDate: this.requestDate,
      providerName: this.providerName,
      referralRequired: this.referralRequired,
      status: this.status,
      notes: this.notes,
    };

    this.authorizationService.addAuthorization(authorization);

    alert('Authorization request saved successfully!');

    this.clearForm();
  }

  clearForm() {
    this.patientId = null;
    this.insuranceId = null;
    this.serviceType = 'Surgery';
    this.procedureName = '';
    this.requestDate = '';
    this.providerName = '';
    this.referralRequired = 'Yes';
    this.status = 'Pending';
    this.notes = '';
  }

  deleteAuthorization(id: number) {
    this.authorizationService.deleteAuthorization(id);
  }
}
