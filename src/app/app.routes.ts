import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { MainLayout } from './features/layout/main-layout/main-layout';

import { PatientList } from './features/patients/patient-list/patient-list';
import { InsuranceList } from './features/insurance/insurance-list/insurance-list';
import { EligibilityList } from './features/eligibility/eligibility-list/eligibility-list';
import { AuthorizationList } from './features/authorization/authorization-list/authorization-list';
import { EncounterList } from './features/encounters/encounter-list/encounter-list';
import { ChargeList } from './features/charges/charge-list/charge-list';
import { CodingList } from './features/coding/coding-list/coding-list';
import { ClaimList } from './features/claims/claim-list/claim-list';
import { ScrubbingList } from './features/scrubbing/scrubbing-list/scrubbing-list';
import { SubmissionList } from './features/submission/submission-list/submission-list';
import { AdjudicationList } from './features/adjudication/adjudication-list/adjudication-list';
import { PaymentList } from './features/payments/payment-list/payment-list';
import { DenialList } from './features/denials/denial-list/denial-list';
import { BillingList } from './features/billing/billing-list/billing-list';
import { ArList } from './features/ar-management/ar-list/ar-list';
import { SecurityManagement } from './features/security/security-management/security-management';

export const routes: Routes = [
  // Default route
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // Login
  {
    path: 'login',
    component: Login,
  },

  // Main Application Layout
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },

      // Dashboard
      { path: 'dashboard', component: Dashboard },

      // Patient Management
      { path: 'patients', component: PatientList },
      { path: 'insurance', component: InsuranceList },
      { path: 'eligibility', component: EligibilityList },
      { path: 'authorization', component: AuthorizationList },

      // Clinical Management
      { path: 'encounters', component: EncounterList },
      { path: 'charges', component: ChargeList },
      { path: 'coding', component: CodingList },

      // Claim Management
      { path: 'claims', component: ClaimList },
      { path: 'scrubbing', component: ScrubbingList },
      { path: 'submission', component: SubmissionList },
      { path: 'adjudication', component: AdjudicationList },

      // Payment & Denial Management
      { path: 'payments', component: PaymentList },
      { path: 'denials', component: DenialList },
      { path: 'billing', component: BillingList },

      // Final Resolution
      { path: 'ar-management', component: ArList },

      // Security
      { path: 'security', component: SecurityManagement },
    ],
  },

  // Invalid route
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
