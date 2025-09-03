import { CommonModule } from '@angular/common';
import {Component, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {ToastModule} from 'primeng/toast';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastModule, RouterLink],
})
export class AppComponent {
}
