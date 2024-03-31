import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../../Models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http:HttpClient) {

  }
  public getProducts(keyword:string="",page :number=1,size:number=4){
    return this.http.get(`http://localhost:8080/products?name_like=${keyword}&_page=${page}&_limit=${size}`,{observe:'response'});

  }
  public CheckProduct(p:Product):Observable<Product>{
    return this.http.patch<Product>(`http://localhost:8080/products/${p.id}`,{checked:!p.checked});
  }
  public DeleteProduct(p:Product):Observable<Product>{
    return this.http.delete<any>(`http://localhost:8080/products/${p.id}`);
  }

  SaveProduct(p: Product) : Observable<Product>{
    return this.http.post<Product>(`http://localhost:8080/products`,p);


  }


  getProductById(productId: number):Observable<Product> {
    return this.http.get<Product>(`http://localhost:8080/products/${productId}`);


  }

  updateProduct(product: Product):Observable<Product> {
    return this.http.put<Product>(`http://localhost:8080/products/${product.id}`,product);

  }
}
