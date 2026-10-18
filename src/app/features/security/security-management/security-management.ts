import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SecurityService } from '../../../core/services/security';

@Component({
  selector: 'app-security-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './security-management.html',
  styleUrl: './security-management.css',
})
export class SecurityManagement {
  securityService = inject(SecurityService);

  name: string = '';
  email: string = '';
  role: string = 'Billing Staff';

  alertMessage: string = '';

  // Count open alerts
  get openAlertsCount(): number {
    return this.securityService.getAlerts().filter((alert: any) => alert.status === 'Open').length;
  }

  addUser() {
    if (!this.name || !this.email) {
      return;
    }

    this.securityService.addUser({
      name: this.name,
      email: this.email,
      role: this.role,
    });

    this.name = '';
    this.email = '';
    this.role = 'Billing Staff';
  }

  deleteUser(id: number) {
    this.securityService.deleteUser(id);
  }

  addAlert() {
    if (!this.alertMessage.trim()) {
      return;
    }

    this.securityService.addAlert(this.alertMessage);
    this.alertMessage = '';
  }

  resolveAlert(id: number) {
    this.securityService.resolveAlert(id);
  }
}
