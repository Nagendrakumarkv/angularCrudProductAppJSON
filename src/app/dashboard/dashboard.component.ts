import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApliService } from '../services/apli.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { DeleteProduct, GetProduct } from '../store/actions/product.action';
import { ProductState } from '../store/state/product.state';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
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
  registeredUserId: any;
  registeredUserInfo: any;
  dbCredential: any;

  @Select(ProductState.getProductList) products$!: Observable<Product[]>;
  @Select(ProductState.getProductsLoaded) produtsLoaded$!: Observable<boolean>;
  productLoadedSub!: Subscription;
  // isProductLoaded:boolean=false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private service: ApliService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.products$.subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.activatedRoute.params.subscribe((id) => {
      this.registeredUserId = id;
    });
    this.getRegisteredUserInfo();
    this.getAllProducts();
  }

  getRegisteredUserInfo() {
    this.service.getRegister().subscribe({
      next: (res) => {
        this.dbCredential = res;
        for (var i = 0; i <= this.dbCredential.length; i++) {
          if (this.dbCredential[i]._id === this.registeredUserId.id) {
            this.registeredUserInfo = this.dbCredential[i];
          }
        }
      },
      error: () => {
        alert('error while fetching register data');
      },
    });
  }
  logOut() {
    this.router.navigate(['login']);
  }
  getAllProducts() {
    // this.produtsLoaded$.subscribe(produtsLoaded=>{
    //   if(!produtsLoaded){
    this.store.dispatch(new GetProduct());
    //   }
    // })
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
    console.log(id)
    this.store.dispatch(new DeleteProduct(id));
    alert('product deleted successfully');
    this.getAllProducts();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
