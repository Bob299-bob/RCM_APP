import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EligibilityService {
  eligibilities: any[] = [];
  nextId: number = 1;

  addEligibility(data: any) {
    const record = {
      id: this.nextId++,
      ...data,
    };

    this.eligibilities.push(record);
  }

  getEligibilities() {
    return this.eligibilities;
  }

  deleteEligibility(id: number) {
    this.eligibilities = this.eligibilities.filter((record) => record.id !== id);
  }

  getTotalEligibility() {
    return this.eligibilities.length;
  }
}
