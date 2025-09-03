import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import {ToastService} from '../../core/services/toast.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Button],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private toast = inject(ToastService);

  showSuccess() {
    this.toast.success('Success', 'Operation completed successfully!');
  }

  showInfo() {
    this.toast.info('Info', 'This is some information.');
  }

  showError() {
    this.toast.error('Error', 'Something went wrong!');
  }

  showAll() {
    this.showSuccess();
    this.showInfo();
    this.showError();
  }
}
