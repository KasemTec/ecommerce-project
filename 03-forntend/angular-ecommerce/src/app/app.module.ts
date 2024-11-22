import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ProductService } from './services/product.service';



// Define Router
// When path matches, create new instance of the component

const routes: Routes = [
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}// Genirc will match on anything that did't match above routes
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  imports: [
    // Configure Routes
    RouterModule.forRoot(routes),
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
