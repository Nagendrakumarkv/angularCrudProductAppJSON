import { Component, OnInit,ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApliService } from '../services/apli.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness','price','comment','action'];
  dataSource !: MatTableDataSource<any>;
  registeredUserId:any;
  registeredUserInfo:any;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private dialog:MatDialog,private service:ApliService,private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getRegisteredUserInfo();
    this.activatedRoute.params.subscribe(id=>{
      this.registeredUserId=id;
    })
  }
  getRegisteredUserInfo(){
    this.service.getRegister().subscribe({
      next:(res)=>{
        this.registeredUserInfo=res[this.registeredUserId.id-1];
      },
      error:()=>{
        alert("error while getting registered user data")
      }
    })
  }
  logOut(){
   this.router.navigate(['login']);
  }
  getAllProducts(){
    this.service.getAllProducts().subscribe({
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
  openDialog(){
   this.dialog.open(DialogComponent,{
   width:'30%'
   }).afterClosed().subscribe(value=>{
     if(value=='save'){
       this.getAllProducts();
     }
   });
  }

  editProduct(row:any){
   this.dialog.open(DialogComponent,{
     width:'30%',
     data:row
   }).afterClosed().subscribe(value=>{
     if(value=='update'){
       this.getAllProducts();
     }
   })
  }
  deleteProduct(id:any){
    this.service.deleteProduct(id).subscribe({
      next:(res)=>{
        alert("product deleted successfully");
        this.getAllProducts();
      },
      error:()=>{
        alert("error while deleting product");
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
