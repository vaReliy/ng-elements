import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RateComponent } from './rate/rate.component';

@NgModule({
  declarations: [
    AppComponent,
    RateComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [],
  entryComponents: [
    RateComponent,
  ],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap(appRef: ApplicationRef): void {
    const rateComponent = createCustomElement(RateComponent, {injector: this.injector});
    customElements.define('stars-rate', rateComponent);
  }
}
