import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../model/IProduct';
import { ServerConfiguration } from '../config/constants';
import { Observable } from 'rxjs';
import { IProductResponse } from '../model/IProductResponse';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  readonly baseUrl = ServerConfiguration.backEndBaseUrl;
  constructor(private http:HttpClient) { }

  saveProduct(product: IProduct, formData: FormData){
    if(product.name == null){
      return;
    }
      this.http.post(`${this.baseUrl}/catalog`, product).subscribe(x =>  this.saveProductPicture(formData, product.name))
  }

  saveProductPicture(formData: FormData, productName: string){
    if(productName == null){
      return;
    }
     this.http.post(`${this.baseUrl}/catalog/picture/${productName}`,formData).subscribe(res => console.log('File Uploaded ...'));
     
  }

  getProducts():Observable<IProductResponse[]>{
   return this.http.get<IProductResponse[]>(`${this.baseUrl}/catalog`)
  }

  getProductByName(productName: string):Observable<IProductResponse>{
    return this.http.get<IProductResponse>(`${this.baseUrl}/catalog/${productName}`)
   }
}
