import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {CardsService} from '../../../core/services/cards.service';

interface Card {
  id: string;
  fullName: string;
  title: string;
  email: string;
  socialMedia: string;
  phoneNumber?: string;
  description?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-view.html',
})
export class CardViewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private auth = inject(AuthService);
  private cards = inject(CardsService);

  card = signal<Card | null>(null);
  userId: string | null = null;
  loading = signal(true);
  screenshotLoading = signal(false);


  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    if (!this.userId) return;

    setTimeout(() => {
      if (this.userId === '8b5b0d35-606f-4c35-918a-8ecc40d186dd') {
        this.card.set({
          id: 'e533f1b0-d701-44de-86b8-0f7104860498',
          fullName: 'Alice Johnson',
          title: 'Software Engineer',
          email: 'alice.johnson@example.com',
          socialMedia: '@alicejohnson',
          phoneNumber: '+1234567890',
          description: 'Loves coding and coffee.',
          userId: '8b5b0d35-606f-4c35-918a-8ecc40d186dd',
          createdAt: '2025-09-03T16:52:59.031Z',
          updatedAt: '2025-09-03T16:52:59.031Z',
        });
      } else {
        this.card.set(null);
      }
      this.loading.set(false);
    }, 1000);
  }

  get isOwnCard(): boolean {
    return (
      this.auth.user()?.payload.sub === this.userId
    );
  }

  editCard() {
    console.log('Edit card clicked');
  }

  deleteCard() {
    this.cards.delete(this.card()?.id ?? '');
  }

  async printCard() {
    if (!this.userId || this.screenshotLoading()) return;

    this.screenshotLoading.set(true);
    try {
      await this.cards.downloadScreenshot(this.userId);
    } catch (err) {
      console.error('Screenshot failed', err);
    } finally {
      this.screenshotLoading.set(false);
    }
  }


  createCard() {
    console.log('Create new card for current user');
  }
}
