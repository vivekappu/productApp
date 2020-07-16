import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {AddProductComponent} from "./add-product/add-product.component";
import {EditProductComponent} from './edit-product/edit-product.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {AuthGuard} from './shared/service/auth.guard';


const routes: Routes =[{path: '', component:ProductListComponent},
  {path:'addproduct',component:AddProductComponent,canActivate:[AuthGuard]},
  {path:'editproduct',component:EditProductComponent, canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent}
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
