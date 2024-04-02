import { Component } from '@angular/core';
import {Product} from "../../../Models/product.model";
import {ProductService} from "../services/product.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  constructor(private ps:ProductService,
              private router:Router,public appState : AppStateService) {

  }

  ngOnInit(): void {
    this.getProduct();
  }
  getProduct(){

    //importer les donner du serveur
    this.ps.getProducts(this.appState.productsState.keyword,this.appState.productsState.currentPage,this.appState.productsState.PageSize).subscribe({
      next:(resp) =>{ //affecter l'observable au liste vide :
        let products=resp.body as Product[];

        let totalProducts:number = parseInt(resp.headers.get('x-total-count')!);
        this.appState.productsState.TotalCount=totalProducts;
        let totalPages= Math.floor(totalProducts / this.appState.productsState.PageSize);
        if(totalProducts%this.appState.productsState.PageSize!=0){
          ++totalPages
        }
        this.appState.setProductState({
          products:products,
          totalProducts:totalProducts,
          TotalPages: totalPages,
          status:"LOADED"
        })
      },
      error:err => {
        console.log(err);
      }
    })
  }


  handleCheckProduct(p: Product) {
    this.ps.CheckProduct(p).subscribe(
      {
        next:updateProduct => {
          p.checked=!p.checked;
        }
      }
    )

  }

  handleDelete(p: Product) {
    if(confirm("Are you sure ?"))
    this.ps.DeleteProduct(p).subscribe({
      next:value => {
         this.appState.productsState.products=this.appState.productsState.products.filter((product:any)=>product.id!=p.id);

      }
    })

  }



  handleGoPage(page: number) {
    this.appState.productsState.currentPage=page;
    this.getProduct();

  }

  handleEdit(p: Product) {
this.router.navigateByUrl(`/admin/editProduct/${p.id}`)

  }
}
