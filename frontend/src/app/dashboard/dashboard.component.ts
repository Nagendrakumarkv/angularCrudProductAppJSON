import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dashboard-popup/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../services/product/product.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { AuthService } from '../auth/auth.service';
import { SuccessComponent } from '../dialog/success/success.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'productName',
    'category',
    'date',
    'freshness',
    'price',
    'comment',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  registeredUsersInfo: any;
  userName!: string;
  userId!: string;
  userIsAuthenticated = false;

  productLoadedSub!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
    private router: Router,
    // private store: Store,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getRegisteredUserInfo();

    this.userIsAuthenticated = this.authService.getUserIsAuthenticated();
    this.userId = this.authService.getUserId();

    this.getAllProducts();
  }

  login() {
    console.log('Hi');
    this.router.navigate(['/auth/login']);
  }
  logOut() {
    this.authService.logOutUser();
    this.router.navigate(['/auth/login']);
  }
  getAllProducts() {
    this.productService.getAllProducts().subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      error:()=>{
        alert("error while getting the products")
      }
    })
  }
  getRegisteredUserInfo() {
    this.authService.geRegisteredtUserInfo().subscribe((data) => {
      this.registeredUsersInfo = data;
      for (let i = 0; i < this.registeredUsersInfo.length; i++) {
        if (this.userId == this.registeredUsersInfo[i]._id) {
          this.userName = this.registeredUsersInfo[i].email.split('@').slice(0,1);
        }
      }
    });
  }
  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value == 'save') {
          this.getAllProducts();
        }
      });
  }

  editProduct(row: any) {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value == 'update') {
          this.getAllProducts();
        }
      });
  }
  deleteProduct(id: any) {
    console.log(id);
    this.productService.deleteProduct(id).subscribe({
      next:(res)=>{
        this.getAllProducts();
      },
      error:()=>{
        alert("error while deleting product");
      }
    })
    let productDeletedSuccessfull = 'Product Deleted Successfully';
    this.dialog.open(SuccessComponent, {
      data: { message: productDeletedSuccessfull },
    });
    this.getAllProducts();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnDestroy(): void {
    this.userIsAuthenticated = false;
  }
}
