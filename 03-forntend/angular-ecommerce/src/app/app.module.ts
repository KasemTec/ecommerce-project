import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';



// Define Router
// When path matches, create new instance of the component

const routes: Routes = [
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id/:name', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  { path: '**', redirectTo: '/products', pathMatch: 'full' }// Genirc will match on anything that did't match above route
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
  ],
  imports: [
    // Configure Routes
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,

],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    { provide: ProductService, useClass: ProductService }  // Update to use provide syntax
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
