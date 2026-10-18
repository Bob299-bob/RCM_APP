import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EncounterService } from '../../../core/services/encounter';
import { ChargeService } from '../../../core/services/charge';

@Component({
  selector: 'app-charge-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './charge-list.html',
  styleUrl: './charge-list.css',
})
export class ChargeList {
  constructor(
    public encounterService: EncounterService,
    public chargeService: ChargeService,
  ) {}

  encounterId: number | null = null;
  serviceName: string = '';
  procedureCode: string = '';
  quantity: number = 1;
  amount: number = 0;
  serviceDate: string = '';
  providerName: string = '';
  status: string = 'Pending';

  addCharge() {
    if (
      !this.encounterId ||
      !this.serviceName ||
      this.amount <= 0 ||
      this.quantity <= 0 ||
      !this.serviceDate ||
      !this.providerName
    ) {
      alert('Please enter valid charge details');
      return;
    }

    const encounter = this.encounterService
      .getEncounters()
      .find((item) => item.id === Number(this.encounterId));

    if (!encounter) {
      alert('Please select a valid encounter');
      return;
    }

    const charge = {
      encounterId: encounter.id,
      patientName: encounter.patientName,
      serviceName: this.serviceName,
      procedureCode: this.procedureCode,
      quantity: this.quantity,
      amount: this.amount,
      totalAmount: this.quantity * this.amount,
      serviceDate: this.serviceDate,
      providerName: this.providerName,
      status: this.status,
    };

    this.chargeService.addCharge(charge);

    this.clearForm();
  }

  clearForm() {
    this.encounterId = null;
    this.serviceName = '';
    this.procedureCode = '';
    this.quantity = 1;
    this.amount = 0;
    this.serviceDate = '';
    this.providerName = '';
    this.status = 'Pending';
  }

  deleteCharge(id: number) {
    this.chargeService.deleteCharge(id);
  }
}
