import { Component, Inject, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { SSR_RESPONSE } from '../../../services/api-url';
import { CanonicalService } from '../../../services/canonical.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit {

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private canonicalService: CanonicalService,
    @Inject(PLATFORM_ID) private platformId: object,
    @Optional() @Inject(SSR_RESPONSE) private response: { status(code: number): void } | null,
  ) {
  }

  ngOnInit(): void {
    if (isPlatformServer(this.platformId) && this.response) {
      this.response.status(404);
    }

    this.titleService.setTitle('Страница не найдена | Тон-сервис');
    this.metaService.updateTag({ name: 'robots', content: 'noindex, follow' });
    this.canonicalService.setCanonical('/404');
  }
}
