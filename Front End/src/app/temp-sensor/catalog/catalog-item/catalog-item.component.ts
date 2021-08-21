import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../../model/IProduct';
import { DomSanitizer } from '@angular/platform-browser';
import { IProductResponse } from '../../model/IProductResponse';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.css']
})
export class CatalogItemComponent implements OnInit {

  @Input() product: IProductResponse;
  image: any;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
   this.transformImage()
  }

  transformImage() {
      let objectURL = 'data:image/jpg;base64,' + this.product.image;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  
  }

}
