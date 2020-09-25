import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// TODO: Наши услуги - баг при прокручивании. Возможно и скорее всего происходит из-за строчки "skipLibCheck": true в файле tsconfig.json
// TODO: we are cool перерисовать иконки и сделать их png
// TODO: Наши работы сделаны по паддингам снизу как-то криво
// TODO: Добавить разные иконки контактов
// TODO: Приложите файл в контактах скрепочка кривая
