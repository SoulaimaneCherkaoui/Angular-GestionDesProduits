import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../../Models/product.model";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
  productId! : number
  productFormGroup! : FormGroup;
  constructor(private route: ActivatedRoute,
              private ps:ProductService,
              private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.productId=this.route.snapshot.params['id'];
    this.ps.getProductById(this.productId).subscribe({
      next:value => {
        this.productFormGroup=this.fb.group({
          id : this.fb.control(value.id),
          name : this.fb.control(value.name,[Validators.required]),
          price : this.fb.control(value.price,[Validators.min(100)]),
          checked : this.fb.control(value.checked),
        })

      },
      error:err => {
        console.log(err)
      }
    });
  }

  UpdateProduct() {
    let product : Product= this.productFormGroup.value;
this.ps.updateProduct(product).subscribe({
  next:value => {
    alert(JSON.stringify(value));
  }
});
  }
}
