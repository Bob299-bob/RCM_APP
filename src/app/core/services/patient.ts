import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  patients: any[] = [];

  nextId: number = 1;

  addPatient(patient: any) {
    const newPatient = {
      id: this.nextId++,
      ...patient,
    };

    this.patients.push(newPatient);
  }

  getPatients() {
    return this.patients;
  }

  deletePatient(id: number) {
    this.patients = this.patients.filter((patient) => patient.id !== id);
  }
}
