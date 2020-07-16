import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../shared/service/products.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product=null;
  constructor(private productsService: ProductsService, private router: Router) {
    this.product = this.router.getCurrentNavigation().extras.state;
  }
  submit(){
    console.log(this.product);
    this.productsService.put(this.product).subscribe((data)=>{alert(data["message"]);
      this.router.navigateByUrl('/');
  },error => console.log(error));}
  ngOnInit(): void {

  }

}
