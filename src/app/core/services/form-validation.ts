import { Injectable } from '@angular/core';

export interface ValidationRule {
  required?: boolean;
  email?: boolean;
  phone?: boolean;
  positiveNumber?: boolean;
  date?: boolean;
  minLength?: number;
  maxLength?: number;
}

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  // Validate one field
  validateField(value: any, rules: ValidationRule): string {
    // Required validation
    if (
      rules.required &&
      (value === null || value === undefined || value.toString().trim() === '')
    ) {
      return 'This field is required.';
    }

    // Empty optional fields are allowed
    if (value === null || value === undefined || value === '') {
      return '';
    }

    const text = value.toString().trim();

    // Email validation
    if (rules.email) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!pattern.test(text)) {
        return 'Please enter a valid email address.';
      }
    }

    // Phone validation (10 digits, optionally with +1)
    if (rules.phone) {
      const pattern = /^(?:\+1)?[0-9]{10}$/;

      if (!pattern.test(text)) {
        return 'Please enter a valid 10-digit phone number.';
      }
    }

    // Positive number validation
    if (rules.positiveNumber) {
      if (isNaN(Number(value)) || Number(value) <= 0) {
        return 'Please enter a number greater than zero.';
      }
    }

    // Date validation
    if (rules.date) {
      if (isNaN(Date.parse(text))) {
        return 'Please enter a valid date.';
      }
    }

    // Minimum length
    if (rules.minLength && text.length < rules.minLength) {
      return `Minimum ${rules.minLength} characters required.`;
    }

    // Maximum length
    if (rules.maxLength && text.length > rules.maxLength) {
      return `Maximum ${rules.maxLength} characters allowed.`;
    }

    return '';
  }

  // Validate complete form
  validateForm(
    formData: any,
    validationRules: Record<string, ValidationRule>,
  ): Record<string, string> {
    const errors: Record<string, string> = {};

    Object.keys(validationRules).forEach((field) => {
      const error = this.validateField(formData[field], validationRules[field]);

      if (error) {
        errors[field] = error;
      }
    });

    return errors;
  }

  // Check whether form is valid
  isFormValid(errors: Record<string, string>): boolean {
    return Object.keys(errors).length === 0;
  }
}
