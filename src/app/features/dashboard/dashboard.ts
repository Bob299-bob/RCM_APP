import { Component } from '@angular/core';
import { PatientService } from '../../core/services/patient';
import { ClaimService } from '../../core/services/claim';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor(
    public patientService: PatientService,
    public claimService: ClaimService,
  ) {}
}
