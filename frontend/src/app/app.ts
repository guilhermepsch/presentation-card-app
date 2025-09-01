import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from '@myorg/shared';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
  protected readonly user = signal<User>({
    id: '1',
    email: 'test@example.com',
    name: 'Test',
  });
  constructor() {
    console.log(this.user());
  }
}
