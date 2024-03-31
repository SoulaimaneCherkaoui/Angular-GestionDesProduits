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
  public getProducts():Observable<Array<Product>>{
    return this.http.get<Array<Product>>("http://localhost:8080/products");

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
  public SearchProducts(keyword: string): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`http://localhost:8080/products?name_like=${keyword}`);
  }


}
