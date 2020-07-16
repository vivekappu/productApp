import { Component, OnInit } from '@angular/core';
import {ProductModel} from "../product-list/product.model";
import {ProductsService} from "../shared/service/products.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product = new ProductModel(null,null,null,null,null,null,null,null);

  constructor(private productsService:ProductsService) { }
  submit(){
    console.log(this.product);
    this.productsService.post(this.product).subscribe((data)=>console.log(data));
  }
  ngOnInit(): void {
  }

}
