import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IProduct } from '../../model/IProduct';
import { CatalogService } from '../../services/catalog.service';
import { async } from '@angular/core/testing';
import { ImageUploaderComponent } from '../catalog/image-uploader/image-uploader.component';


@Component({
  selector: 'app-catalog-item-add',
  templateUrl: './catalog-item-add.component.html',
  styleUrls: ['./catalog-item-add.component.scss']
})
export class CatalogItemAddComponent implements OnInit {

  @Output() private productSaved: EventEmitter<any> = new EventEmitter();
  @ViewChild(ImageUploaderComponent) child: ImageUploaderComponent;
  addProductForm = this.fb.group({
    productName: [''],
    minTemp: [''],
    maxTemp: [''],
    airHumidity: [''],
    groundHumidity: [''],
    notes: ['']
  });
  
  private product: IProduct
  private formData: FormData;
  

  constructor(private fb: FormBuilder,
    private catalogService: CatalogService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    if(this.addProductForm.value.productName == "" || this.formData == null){
      return;
    }
    this.product = {
      name: this.addProductForm.value.productName,
      minTemp: this.addProductForm.value.minTemp,
      maxTemp: this.addProductForm.value.maxTemp,
      airHumidity: this.addProductForm.value.airHumidity,
      groundHumidity: this.addProductForm.value.groundHumidity,
      notes: this.addProductForm.value.notes
    }

    if(this.valuesAreValid()){
      return;
    }
    
    this.catalogService.saveProduct(this.product, this.formData)
    this.addProductForm.reset();
    this.child.url =null;
    (async()=>{
      
      
      await this.delay();
    
      this.productSaved.emit("h");
    })();
  
  }

  valuesAreValid(): boolean {
    console.log(this.product)
    if(this.product.minTemp < 0 || this.product.minTemp>49 ){
      return true
    }
    if(this.product.maxTemp < 0 || this.product.maxTemp>49 ){
      return true
    }
    if(this.product.minTemp >= this.product.maxTemp){
      return true;
    }
    if(this.product.airHumidity < 0 || this.product.airHumidity>100){
      return true;
    }
    if(this.product.groundHumidity < 0 || this.product.groundHumidity>100){
      return true;
    }

    return false;
  }
  imageChosen(event: any){
    if(event == undefined){
      return
    } 
    
    this.formData = new FormData();
    this.formData.append('file', event);
   
  }

  delay(){
    return new Promise(resolve => setTimeout(resolve, 1500))
  }
}
