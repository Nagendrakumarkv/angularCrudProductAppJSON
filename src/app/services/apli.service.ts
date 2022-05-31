import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApliService {
  produtListUrl="http://localhost:3000/productList/";
  registerUrl="http://localhost:3000/register/"
  constructor(private http:HttpClient) { }

  addProducts(data:any){
    return this.http.post<any>(this.produtListUrl,data);
  }
  getAllProducts(){
    return this.http.get<any>(this.produtListUrl);
  }

  putProduct(data:any,id:any){
    return this.http.put<any>(this.produtListUrl+id,data);
  }
  deleteProduct(id:any){
    return this.http.delete<any>(this.produtListUrl+id)
  }
 postRegister(data:any){
  return this.http.post<any>(this.registerUrl,data)
 }
 getRegister(){
   return this.http.get<any>(this.registerUrl);
 }
}
