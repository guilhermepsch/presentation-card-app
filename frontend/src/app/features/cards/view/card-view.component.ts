import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {CardsService} from '../../../core/services/cards.service';
import {ResponseCardDto} from '@presentation/shared';
import {ToastService} from '../../../core/services/toast.service';

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: './card-view.html',
})
export class CardViewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private auth = inject(AuthService);
  private cards = inject(CardsService);
  private router = inject(Router);
  private toast = inject(ToastService);

  card = signal<ResponseCardDto | null>(null);
  userId: string | null = null;
  loading = signal(true);
  screenshotLoading = signal(false);


  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    if (!this.userId) return;

    try {
      this.loadCard();
    } catch (err) {
      console.error('Failed to load card', err);
    } finally {
      this.loading.set(false);
    }
  }

  get isOwnCard(): boolean {
    return (
      this.auth.user()?.payload.sub === this.userId
    );
  }

  editCard() {
    const cardId = this.card()?.id;
    if (!cardId) return;

    this.router.navigate([`/cards/form/edit/${this.userId}`]);
  }


  async deleteCard() {
    const cardId = this.card()?.id;
    if (!cardId) return;
    const success = await this.cards.delete(cardId);
    if (!success) return;
    this.card.set(null);
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
    this.router.navigate([`/cards/form/new`]);
  }

  async loadCard() {
    try {
      this.card.set(await this.cards.findByUserId(this.userId!));
    } catch (err) {
      console.error('Failed to load card', err);
      this.toast.error('Erro', 'Não foi possível carregar o cartão');
      this.router.navigate(['/cards', this.auth.user()?.payload.sub]);
    } finally {
      this.loading.set(false);
    }
  }
}
