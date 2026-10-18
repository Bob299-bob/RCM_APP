import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClaimService {
  claims: any[] = [];
  nextId: number = 1;

  addClaim(data: any) {
    const claim = {
      id: this.nextId++,
      ...data,
    };

    this.claims.push(claim);
  }

  getClaims() {
    return this.claims;
  }

  deleteClaim(id: number) {
    this.claims = this.claims.filter((claim) => claim.id !== id);
  }

  getTotalClaims() {
    return this.claims.length;
  }

  getPendingClaims() {
    return this.claims.filter((claim) => claim.status === 'Pending').length;
  }

  getDeniedClaims() {
    return this.claims.filter((claim) => claim.status === 'Denied').length;
  }
}
