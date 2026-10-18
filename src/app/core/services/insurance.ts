import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InsuranceService {
  insurances: any[] = [];

  nextId: number = 1;

  addInsurance(insurance: any) {
    const newInsurance = {
      id: this.nextId++,
      ...insurance,
    };

    this.insurances.push(newInsurance);
  }

  getInsurances() {
    return this.insurances;
  }

  deleteInsurance(id: number) {
    this.insurances = this.insurances.filter((insurance) => insurance.id !== id);
  }
}
