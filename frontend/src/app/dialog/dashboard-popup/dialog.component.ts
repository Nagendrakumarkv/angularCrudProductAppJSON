import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Store, UpdateState } from '@ngxs/store';
import { AddProduct, UpdateProduct } from '../../store/actions/product.action';
import { SuccessComponent } from '../success/success.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  freshnessList = ['fresh', 'second hand', 'third hand'];
  productForm!: FormGroup;
  actionBtn: string = 'Save';

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private store: Store,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Upadte';
      this.productForm.controls['productName'].setValue(
        this.editData.productName
      );
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
    }
  }

  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        console.log(this.productForm.value);
        this.store.dispatch(new AddProduct(this.productForm.value));
        // alert('product added successfully');
        let productAddedSuccessfull = 'Product Added Successfully';
        this.dialog.open(SuccessComponent, {
          data: { message: productAddedSuccessfull },
        });
        this.productForm.reset();
        this.dialogRef.close('save');
      }
    } else {
      this.updateProduct();
    }
  }
  updateProduct() {
    // this.service.putProduct(this.productForm.value,this.editData._id).subscribe({
    //   next:(res)=>{
    //     alert("product updated successfully")
    //     this.productForm.reset();
    //     this.dialogRef.close('update')
    //   },
    //   error:()=>{
    //     alert("error while updating the product")
    //   }
    // })
    this.store.dispatch(
      new UpdateProduct(this.productForm.value, this.editData._id)
    );
    let productUpdatedSuccessfull = 'Product Updated Successfully';
    this.dialog.open(SuccessComponent, {
      data: { message: productUpdatedSuccessfull },
    });

    this.productForm.reset();
    this.dialogRef.close('update');
  }
}
