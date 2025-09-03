import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CardsService} from '../../../core/services/cards.service';
import {ToastService} from '../../../core/services/toast.service';
import {AuthService} from '../../../core/services/auth.service';
import {CreateCardDto, ResponseCardDto} from '@presentation/shared';

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-form.html',
})
export class CardFormComponent implements OnInit {
  private cards = inject(CardsService);
  private toast = inject(ToastService);
  private auth = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Form signals
  id = signal('');
  fullName = signal('');
  title = signal('');
  email = signal('');
  socialMedia = signal('');
  phoneNumber = signal('');
  description = signal('');

  loading = signal(true);
  saving = signal(false);

  userId: string | null = null;
  currentUserId: string | null = null;

  async ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId'); // comes from /edit/:userId
    this.currentUserId = this.auth.user()?.payload.sub ?? null;

    try {
      if (!this.userId) {
        // CREATE mode
        const existingCard = await this.cards.findByUserId(this.currentUserId!);
        if (existingCard) {
          this.toast.info('Aviso', 'Você já possui um cartão.');
          this.router.navigate(['/cards', this.currentUserId]);
          return;
        }
      } else {
        // EDIT mode
        const card = await this.cards.findByUserId(this.userId);
        if (card.userId !== this.currentUserId) {
          this.toast.error('Erro', 'Você não pode editar o cartão de outro usuário.');
          this.router.navigate(['/cards', card.userId]);
          return;
        }

        this.id.set(card.id);
        this.fullName.set(card.fullName);
        this.title.set(card.title);
        this.email.set(card.email);
        this.socialMedia.set(card.socialMedia);
        this.phoneNumber.set(card.phoneNumber ?? '');
        this.description.set(card.description ?? '');
      }
    } catch (err) {
      console.error('Failed to load card', err);
    } finally {
      this.loading.set(false);
    }
  }


  async saveCard(event: SubmitEvent) {
    event.preventDefault();
    if (this.saving()) return;

    this.saving.set(true);

    const payload: CreateCardDto = {
      fullName: this.fullName(),
      title: this.title(),
      email: this.email(),
      socialMedia: this.socialMedia(),
      phoneNumber: this.phoneNumber() || undefined,
      description: this.description() || undefined,
    };

    try {
      let savedCard: ResponseCardDto;

      if (this.id()) {
        await this.cards.update(this.id(), payload);
        this.toast.success('Sucesso', 'Cartão atualizado com sucesso');
      } else {
        await this.cards.create(payload);
        this.toast.success('Sucesso', 'Cartão criado com sucesso');
      }

      this.router.navigate(['/cards', this.currentUserId]);
    } finally {
      this.saving.set(false);
    }
  }
}
