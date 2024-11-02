import { Component } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-table.component.html',
  //templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
products: Product[] = [];
  // inject the Product Service
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.listProducts();
  }

  private listProducts() {
    this.productService.getProductList().subscribe(
      data => {
        this.products = data; // Assign results to the Product array
      }
    )
  }
}
