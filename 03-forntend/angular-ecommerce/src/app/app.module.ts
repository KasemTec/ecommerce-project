import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //  HttpClientModule    no longer need in Angular 18, instead add provideHttpClient() in providers
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    { provide: ProductService, useClass: ProductService }  // Update to use provide syntax
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
