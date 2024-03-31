import { Component } from '@angular/core';
import {Product} from "../../../Models/product.model";
import {ProductService} from "../services/product.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products : Array<Product>=[];
  TotalPages : number=0;
  PageSize:number=3;
  currentPage:number=1;
  public keyword : string = "";
  constructor(private ps:ProductService,
              private router:Router) {

  }

  ngOnInit(): void {
    this.getProduct();
  }
  getProduct(){
    //importer les donner du serveur
    this.ps.getProducts(this.keyword,this.currentPage,this.PageSize).subscribe({
      next:(resp) =>{ //affecter l'observable au liste vide :
        this.products=resp.body as Product[];
        let totalProducts:number = parseInt(resp.headers.get('x-total-count')!);
        this.TotalPages = Math.floor(totalProducts / this.PageSize);
        if(totalProducts%this.PageSize!=0){
         this.TotalPages=this.TotalPages+1;
        }
      },
      error:err => {
        console.log(err)
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
         this.products=this.products.filter(product=>product.id!=p.id);

      }
    })

  }



  handleGoPage(page: number) {
    this.currentPage=page;
    this.getProduct();

  }

  handleEdit(p: Product) {
this.router.navigateByUrl(`/editProduct/${p.id}`)

  }
}
