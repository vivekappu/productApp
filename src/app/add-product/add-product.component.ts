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
  product = new ProductModel(null, null, null, null, null, null, null,null);
  image: File=null;
  imageSrc: string;
  form =document.getElementById('form');
  constructor(private productsService: ProductsService, private router: Router) {
  }
  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = <File> file;
    }
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;



      };

    }
  }
  submit() {
    console.log(this.image);

    const formData=new FormData();
    formData.append('imageUrl',this.image);
    console.log(this.product);
    // tslint:disable-next-line:forin
    let item=this.product;
    for ( let key in item ) {
      formData.append(key, item[key]);
    }

    this.productsService.post(formData).subscribe((data) => {
        alert(data["message"]);
        this.router.navigateByUrl('/');
      }
    );
  }


  ngOnInit(): void {
  }

}
