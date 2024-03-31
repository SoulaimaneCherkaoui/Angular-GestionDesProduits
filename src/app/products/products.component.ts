import { Component } from '@angular/core';
import {Product} from "../../../Models/product.model";
import {ProductService} from "../services/product.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products : Array<Product>=[];
  public keyword : string = "";
  constructor(private ps:ProductService) {

  }

  ngOnInit(): void {
    this.getProduct();
  }
  getProduct(){
    //importer les donner du serveur
    this.ps.getProducts().subscribe({
      next:data =>{ //affecter l'observable au liste vide :
        this.products=data},
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

  SearchProduct() {
this.ps.SearchProducts(this.keyword).subscribe({
  next: value => {
    this.products=value;
    console.log(value);
  },
  error: err => {
    console.error('Une erreur s\'est produite :', err);
  }
})
  }
}
