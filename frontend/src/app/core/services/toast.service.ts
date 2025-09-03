import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

export type ToastSeverity = 'success' | 'info' | 'warn' | 'error';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messageService = inject(MessageService);

  private showToast(
    severity: ToastSeverity,
    summary: string,
    detail: string,
    life = 3000
  ) {
    this.messageService.add({
      severity,
      summary,
      detail,
      life,
      styleClass: `custom-toast ${severity}-toast`,
    });
  }


  success(summary: string, detail: string, life?: number) {
    this.showToast('success', summary, detail, life);
  }

  info(summary: string, detail: string, life?: number) {
    this.showToast('info', summary, detail, life);
  }

  warn(summary: string, detail: string, life?: number) {
    this.showToast('warn', summary, detail, life);
  }

  error(summary: string, detail: string, life?: number) {
    this.showToast('error', summary, detail, life);
  }

  clear() {
    this.messageService.clear();
  }
}
