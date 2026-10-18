import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../../core/services/patient';
import { FormValidationService } from '../../../core/services/form-validation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.css',
})
export class PatientList {
  constructor(
    public patientService: PatientService,
    private validationService: FormValidationService,
    private router: Router,
  ) {}

  firstName: string = '';
  lastName: string = '';
  dateOfBirth: string = '';
  gender: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';

  errors: Record<string, string> = {};

  // Register patient
  addPatient() {
    const patient = {
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth,
      gender: this.gender,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };

    // Common validation service
    this.errors = this.validationService.validateForm(patient, {
      firstName: {
        required: true,
        minLength: 2,
        maxLength: 50,
      },
      lastName: {
        required: true,
        minLength: 2,
        maxLength: 50,
      },
      dateOfBirth: {
        required: true,
        date: true,
      },
      gender: {
        required: true,
      },
      email: {
        email: true,
      },
      phone: {
        phone: true,
      },
      address: {
        maxLength: 250,
      },
    });

    // Stop if validation fails
    if (!this.validationService.isFormValid(this.errors)) {
      return;
    }

    this.patientService.addPatient(patient);

    alert('Patient registered successfully!');

    this.clearForm();

    this.router.navigate(['/insurance']);
  }

  // Clear form
  clearForm() {
    this.firstName = '';
    this.lastName = '';
    this.dateOfBirth = '';
    this.gender = '';
    this.email = '';
    this.phone = '';
    this.address = '';

    this.errors = {};
  }

  // Delete patient
  deletePatient(id: number) {
    this.patientService.deletePatient(id);
  }
}
