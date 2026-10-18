import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PatientService } from '../../../core/services/patient';
import { EncounterService } from '../../../core/services/encounter';

@Component({
  selector: 'app-encounter-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './encounter-list.html',
  styleUrl: './encounter-list.css',
})
export class EncounterList {
  constructor(
    public patientService: PatientService,
    public encounterService: EncounterService,
  ) {}

  patientId: number | null = null;
  providerName: string = '';
  encounterDate: string = '';
  visitType: string = 'Office Visit';
  diagnosis: string = '';
  notes: string = '';
  status: string = 'Scheduled';

  addEncounter() {
    if (!this.patientId || !this.providerName || !this.encounterDate || !this.diagnosis) {
      alert('Please enter all required details');
      return;
    }

    const patient = this.patientService.getPatients().find((p) => p.id === Number(this.patientId));

    if (!patient) {
      alert('Please select a registered patient');
      return;
    }

    const encounter = {
      patientId: patient.id,
      patientName: patient.firstName + ' ' + patient.lastName,
      providerName: this.providerName,
      encounterDate: this.encounterDate,
      visitType: this.visitType,
      diagnosis: this.diagnosis,
      notes: this.notes,
      status: this.status,
    };

    this.encounterService.addEncounter(encounter);

    alert('Encounter created successfully!');

    this.clearForm();
  }

  clearForm() {
    this.patientId = null;
    this.providerName = '';
    this.encounterDate = '';
    this.visitType = 'Office Visit';
    this.diagnosis = '';
    this.notes = '';
    this.status = 'Scheduled';
  }

  deleteEncounter(id: number) {
    this.encounterService.deleteEncounter(id);
  }
}
