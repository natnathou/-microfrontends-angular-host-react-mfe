import { NgModule, Inject, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';
import { HomeComponent } from './home.component';
import { ELEMENT_REF } from 'src/bootstrap';
@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [],
  exports: [],
})
export class AppModule {
  constructor(
    private injector: Injector,
    @Inject(ELEMENT_REF) private elementRef: string
  ) {}

  ngDoBootstrap() {
    const ce = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('mfe1-element', ce);
  }
}
