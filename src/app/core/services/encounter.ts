import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EncounterService {
  encounters: any[] = [];
  nextId: number = 1;

  addEncounter(data: any) {
    const encounter = {
      id: this.nextId++,
      ...data,
    };

    this.encounters.push(encounter);
  }

  getEncounters() {
    return this.encounters;
  }

  deleteEncounter(id: number) {
    const index = this.encounters.findIndex((encounter) => encounter.id === id);

    if (index !== -1) {
      this.encounters.splice(index, 1);
    }
  }
}
