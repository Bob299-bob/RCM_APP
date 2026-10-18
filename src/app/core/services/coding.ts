import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CodingService {
  codings: any[] = [];
  nextId: number = 1;

  addCoding(data: any) {
    const coding = {
      id: this.nextId++,
      ...data,
    };

    this.codings.push(coding);
  }

  getCodings() {
    return this.codings;
  }

  deleteCoding(id: number) {
    this.codings = this.codings.filter((coding) => coding.id !== id);
  }

  getTotalCodings() {
    return this.codings.length;
  }
}
