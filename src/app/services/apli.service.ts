import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApliService {
  // produtListUrl="http://localhost:3000/productList/";
  // registerUrl="http://localhost:3000/register/"

  produtListUrl="http://localhost:9000/products/";
  registerUrl="http://localhost:9000/registers/";



  constructor(private http:HttpClient) { }

  addProducts(data:any){
    return this.http.post<any>(this.produtListUrl,data);
  }
  getAllProducts(){
    return this.http.get<any>(this.produtListUrl);
  }

  putProduct(data:any,id:any){
    console.log("putProduct")
    return this.http.put<any>(this.produtListUrl+id,data);
  }
  deleteProduct(id:any){
    return this.http.delete<any>(this.produtListUrl+id)
  }
 postRegister(data:any){
   console.log(data)
  return this.http.post<any>(this.registerUrl,data)
 }
 getRegister(){
   return this.http.get<any>(this.registerUrl);
 }
}
