import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit{
public productForm!:FormGroup;
constructor(private fb:FormBuilder,private ps:ProductService) {
}
  ngOnInit(): void {
  this.productForm=this.fb.group({

    name:this.fb.control('',[Validators.required]),
    price:this.fb.control(0),
    checked:this.fb.control(false)
  })
  }

  saveProduct() {
    let p = this.productForm.value;
    this.ps.SaveProduct(p).subscribe({
      next : value => {

    }
    });
  }
}
