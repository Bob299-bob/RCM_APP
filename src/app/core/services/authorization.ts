import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  authorizations: any[] = [];
  nextId: number = 1;

  addAuthorization(data: any) {
    const record = {
      id: this.nextId++,
      ...data,
    };

    this.authorizations.push(record);
  }

  getAuthorizations() {
    return this.authorizations;
  }

  deleteAuthorization(id: number) {
    this.authorizations = this.authorizations.filter((item) => item.id !== id);
  }

  getTotalAuthorizations() {
    return this.authorizations.length;
  }
}
