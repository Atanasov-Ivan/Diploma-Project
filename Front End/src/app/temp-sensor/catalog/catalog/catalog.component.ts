import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { IProduct } from '../../model/IProduct';
import { CatalogService } from '../../services/catalog.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IProductResponse } from '../../model/IProductResponse';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit, AfterContentInit, OnDestroy {

  catalog: IProductResponse[]
  constructor(private catalogService: CatalogService,
    ) { }


  ngOnInit(): void {
    this.catalogService.getProducts().subscribe(ex => this.catalog = ex);
  }

  

  ngAfterContentInit(): void {
    const mainContainer = <HTMLElement>document.getElementsByClassName("main-container")[0]
    mainContainer.style["background"] = "url('/assets/images/partial-background.png') repeat center center fixed"
    mainContainer.style["background-size"] = "100% 100%"
  }

  ngOnDestroy(): void {
    const mainContainer = <HTMLElement>document.getElementsByClassName("main-container")[0]
    mainContainer.style["background"] = "url('/assets/images/garden-background.png') repeat center center fixed"
    mainContainer.style["background-size"] = "100% 100%"
  }

  productSaved(e:any){
    this.catalogService.getProducts().subscribe(ex => this.catalog = ex);
  }
}
