import { Injectable, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private http: HttpClient , private router: Router) { }

  getall(){
    return this.http.get('http://localhost:3000/products');
  }
  post(product){
    return this.http.post('http://localhost:3000/products',product);
  }
  delete(product){
    return this.http.post('http://localhost:3000/products/delete',product);
  }
  get(product){
   return   this.http.get(`http://localhost:3000/products/${product._id}`);

  }
  put(product){
    console.log(product);
    return this.http.put(`http://localhost:3000/products`,product)
  }
}
