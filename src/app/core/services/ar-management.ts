import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ARManagementService {
  records: any[] = [];
  nextId: number = 1;

  addRecord(data: any) {
    const record = {
      id: this.nextId++,
      ...data,
    };

    this.records.push(record);
  }

  getRecords() {
    return this.records;
  }

  deleteRecord(id: number) {
    this.records = this.records.filter((record) => record.id !== id);
  }

  getOpenRecords() {
    return this.records.filter((record) => record.status !== 'Resolved');
  }

  getResolvedRecords() {
    return this.records.filter((record) => record.status === 'Resolved');
  }

  getTotalOutstanding() {
    return this.getOpenRecords().reduce((total, record) => total + Number(record.balance), 0);
  }
}
