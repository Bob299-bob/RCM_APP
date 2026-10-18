import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  users: any[] = [
    { id: 1, name: 'Admin User', email: 'admin@rcm.com', role: 'Admin' },
    { id: 2, name: 'Doctor User', email: 'doctor@rcm.com', role: 'Doctor' },
    { id: 3, name: 'Billing User', email: 'billing@rcm.com', role: 'Billing Staff' },
  ];

  auditLogs: any[] = [
    {
      id: 1,
      user: 'Admin User',
      action: 'Login',
      details: 'User logged into the application',
      date: new Date().toLocaleString(),
    },
  ];

  alerts: any[] = [];

  addLog(user: string, action: string, details: string) {
    this.auditLogs.unshift({
      id: Date.now(),
      user,
      action,
      details,
      date: new Date().toLocaleString(),
    });
  }

  getUsers() {
    return this.users;
  }

  getAuditLogs() {
    return this.auditLogs;
  }

  getAlerts() {
    return this.alerts;
  }

  addUser(user: any) {
    this.users.push({
      id: Date.now(),
      ...user,
    });

    this.addLog(user.name, 'User Created', 'New user added');
  }

  deleteUser(id: number) {
    const user = this.users.find((item) => item.id === id);

    if (user) {
      this.addLog(user.name, 'User Deleted', 'User removed from demo list');
      this.users = this.users.filter((item) => item.id !== id);
    }
  }

  addAlert(message: string) {
    this.alerts.unshift({
      id: Date.now(),
      message,
      date: new Date().toLocaleString(),
      status: 'Open',
    });
  }

  resolveAlert(id: number) {
    const alert = this.alerts.find((item) => item.id === id);

    if (alert) {
      alert.status = 'Resolved';
    }
  }
}
