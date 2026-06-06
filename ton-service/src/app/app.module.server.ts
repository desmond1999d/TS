import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    provideNoopAnimations(),
  ],
})
export class AppServerModule {}
