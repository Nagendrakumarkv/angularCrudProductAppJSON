import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private productUrl='http://localhost:3000/productList/';

  constructor(private http:HttpClient) { }

  postProducts(data:any):any{
    return this.http.post<any>(this.productUrl,data)
  }

  getProducts(){
    return this.http.get<any>(this.productUrl)
  }
  putProduct(data:any,id:number){
     return this.http.put<any>(this.productUrl+id,data)
  }
  deleteProduct(id:any){
    return this.http.delete<any>(this.productUrl+id)
  }
}
