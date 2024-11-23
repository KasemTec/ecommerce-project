import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-category-menu',
  //standalone: true,
  //imports: [],
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent implements OnInit {
  // Define  property
  productCategories: ProductCategory[] = [];

  constructor(private productService: ProductService) {}


  ngOnInit(): void {
    this.listProductCategories();
    throw new Error('Method not implemented.');
  }
  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Category=' + JSON.stringify(data));
        this.productCategories = data; // assign data to property
      }
    );
  }

}
