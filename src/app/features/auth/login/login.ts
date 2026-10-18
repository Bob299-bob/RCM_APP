import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.email === '' || this.password === '') {
      this.message = 'Please enter email and password';
    } else {
      this.message = 'Login successful!';
      this.router.navigate(['/dashboard']);
    }
  }
}
