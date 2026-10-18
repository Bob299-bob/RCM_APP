import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdjudicationService {
  adjudications: any[] = [];
  nextId: number = 1;

  addAdjudication(data: any) {
    const record = {
      id: this.nextId++,
      ...data,
    };

    this.adjudications.push(record);
  }

  getAdjudications() {
    return this.adjudications;
  }

  deleteAdjudication(id: number) {
    const index = this.adjudications.findIndex((item) => item.id === id);

    if (index !== -1) {
      this.adjudications.splice(index, 1);
    }
  }

  getApprovedClaims() {
    return this.adjudications.filter((item) => item.status === 'Approved').length;
  }

  getDeniedClaims() {
    return this.adjudications.filter((item) => item.status === 'Denied').length;
  }
}
