import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrubbingService {
  results: any[] = [];
  nextId: number = 1;

  addResult(data: any) {
    const result = {
      id: this.nextId++,
      ...data,
    };

    this.results.push(result);
  }

  getResults() {
    return this.results;
  }

  deleteResult(id: number) {
    const index = this.results.findIndex((result) => result.id === id);

    if (index !== -1) {
      this.results.splice(index, 1);
    }
  }

  getTotalResults() {
    return this.results.length;
  }
}
