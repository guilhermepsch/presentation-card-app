import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {CreateUserDto, CreateUserSchema} from '@presentation/shared';
import {UsersService} from '../../../core/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  imports: [CommonModule, FormsModule, RouterLink],
  standalone: true,
})
export class RegisterComponent {
  private usersService = inject(UsersService);

  // form signals
  email = signal('');
  password = signal('');

  loading = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  register = async (event: SubmitEvent) => {
    event.preventDefault();
    this.loading.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    const payload: CreateUserDto = {
      email: this.email(),
      password: this.password(),
    };

    try {
      await CreateUserSchema.parseAsync(payload);
      await this.usersService.create(payload);
      this.successMessage.set('Registration successful! You can now log in.');
      this.email.set('');
      this.password.set('');
    } finally {
      this.loading.set(false);
    }
  };
}
