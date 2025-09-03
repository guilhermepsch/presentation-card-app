import { CommonModule } from '@angular/common';
import {Component, inject, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {ToastModule} from 'primeng/toast';
import {AuthService} from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastModule, RouterLink],
})
export class AppComponent {
  protected authService = inject(AuthService);
}
