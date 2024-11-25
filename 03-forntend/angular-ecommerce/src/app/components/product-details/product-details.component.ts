import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  product!: Product;

  constructor(private ProductService: ProductService,
              private route: ActivatedRoute) {

  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {

      this.handleProductDetails();})
  }

  handleProductDetails(): void {
    // get tthe "id" param string. + convert string to number
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.ProductService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

}
