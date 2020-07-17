import { Component, OnInit } from '@angular/core';
import {ProductModel} from "../product-list/product.model";
import {ProductsService} from "../shared/service/products.service";
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product = new ProductModel(null, null, null, null, null, null, null, null);

  constructor(private productsService: ProductsService, private router: Router) {
  }

  submit() {

    this.productsService.post(this.product).subscribe((data) => {
        alert(data['message']);
        this.router.navigateByUrl('/');
      }
    );
  }


  ngOnInit(): void {
  }

}
