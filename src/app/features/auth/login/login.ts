
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormValidationService } from '../../../core/services/form-validation';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email: string = '';
  password: string = '';
  message: string = '';

  errors: Record<string, string> = {};

  constructor(
    private router: Router,
    private validationService: FormValidationService
  ) {}

  login() {

    const loginData = {
      email: this.email,
      password: this.password
    };

    // Common validation service
    this.errors = this.validationService.validateForm(
      loginData,
      {
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          minLength: 8
        }
      }
    );

    // Stop if validation fails
    if (!this.validationService.isFormValid(this.errors)) {
      this.message = '';
      return;
    }

    this.message = 'Login successful!';

    this.router.navigate(['/dashboard']);
  }
}
