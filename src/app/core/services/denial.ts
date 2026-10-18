import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DenialService {
  denials: any[] = [];
  nextId: number = 1;

  addDenial(data: any) {
    const denial = {
      id: this.nextId++,
      ...data,
    };

    this.denials.push(denial);
  }

  getDenials() {
    return this.denials;
  }

  deleteDenial(id: number) {
    const index = this.denials.findIndex((denial) => denial.id === id);

    if (index !== -1) {
      this.denials.splice(index, 1);
    }
  }

  getTotalDenials() {
    return this.denials.length;
  }

  getPendingAppeals() {
    return this.denials.filter((denial) => denial.appealStatus === 'Pending').length;
  }
}
