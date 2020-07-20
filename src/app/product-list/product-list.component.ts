import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../shared/service/products.service";
import {Router} from '@angular/router';
import {AuthService} from '../shared/service/auth.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  baseUrl='http://localhost:3000/'
  IsloggedIn=this.authService.IsloggedIn();
  products=null;
  productToEdit=null;
  showImage=false;
  imageStatus='show image';
  constructor(private productsService:ProductsService,private router:Router,private authService:AuthService) { }
  loadProducts(){
   this.productsService.getall().subscribe(data=> {
     this.products = data;

   }
   );

  }
  toggleImage(){
    if(this.showImage==false){
      this.showImage=true;
      this.imageStatus='hide image';
    }
    else{
      this.imageStatus='show image';
      this.showImage=false;
    }
  }

  ngOnInit(): void {
    this.loadProducts();
    const timer = JSON.parse(localStorage.getItem('timer'));
    if (timer && (Date.now() > timer)) {
      this.authService.logoutUser();
      this.router.navigate(['/']);
    }
  }
  delete(product){
    console.log(product);
    this.productsService.delete(product).subscribe(data => this.loadProducts())
  }
  edit(product){

    this.productsService.get(product).subscribe(data => {
      this.router.navigateByUrl('editproduct', { state:data});
    });

  }

}
