import { Component, OnInit, ɵConsole } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import { IProductResponse } from '../model/IProductResponse';
import {Location} from '@angular/common'; 


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: IProductResponse[]
  
  constructor(private catalogService:CatalogService,
    private location: Location) { }

  ngOnInit(): void {
    this.catalogService.getProducts().subscribe(x => this.products = x)
  }

  
    
}
