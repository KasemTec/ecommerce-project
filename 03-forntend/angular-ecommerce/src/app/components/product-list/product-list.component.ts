import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  products: Product[] = [];
  currentCategoryId: number = 1;
  currentCategoryName: string = "";
  searchMode: boolean = false;
  infoMessage: string = "";

  // inject the Product Service
  constructor(private productService: ProductService,
              private route: ActivatedRoute) {}  // inject the activatedRoute

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }


  private listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handelSearchProducts();
    } else {
      const keyword = this.route.snapshot.paramMap.get('keyword') || 'unknown';
      this.infoMessage = `There is no product with keyword: ${keyword}`;
      this.handelListProducts();
    }
  }


  handelSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // now search for the products using this keyword
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handelListProducts() {
    // Check if the "id" parameter is available
    // use the ActivatedRoute and Map of all the route parameters, and read the id
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      //get the "id" param string. Convert string to a numer using the "+"symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

         // get the "name" param string
          this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }
    else {
      // not category id available, get the defualt id = 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }


    // Get the products for teh given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data; // Assign results to the Product array
      }
    )

  }
}
