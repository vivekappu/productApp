import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../shared/service/products.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product = null;
  baseUrl = 'http://localhost:3000';
  image: File = null;
  imageSrc: string;
  form = document.getElementById('form');
  constructor(private productsService: ProductsService, private router: Router) {
    this.product = this.router.getCurrentNavigation().extras.state;
    this.imageSrc = `${(this.baseUrl)}/images/${this.product.imageUrl}`;
  }
  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = (file as File);
    }
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;



      };

    }
  }
  submit() {
    console.log(this.image);
    const formData = new FormData();
    formData.append('imageUrl', this.image);
    console.log(this.product);

    const item = this.product;
    for ( const key in item ) {
      formData.append(key, item[key]);
    }

    this.productsService.put(formData).subscribe((data) => {
        alert(data['message']);
        this.router.navigateByUrl('/');
      }
    );
  }
  ngOnInit(): void {

  }

}
