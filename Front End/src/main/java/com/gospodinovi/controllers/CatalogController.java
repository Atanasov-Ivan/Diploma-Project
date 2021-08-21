package com.gospodinovi.controllers;

import com.gospodinovi.models.Catalog;
import com.gospodinovi.models.DeviceControls;
import com.gospodinovi.service.CatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
@RequestMapping(path = "/catalog")
public class CatalogController {

    @Autowired
    private CatalogService catalogService;

    @PostMapping
    public ResponseEntity<?> saveProductInCatalog(@RequestBody Catalog catalog){
        this.catalogService.saveProduct(catalog);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(path = "/picture/{productName}")
    public ResponseEntity<?> pic(@RequestParam(value="file") MultipartFile file,@PathVariable("productName") String productName){

        this.catalogService.saveProductImage(file, productName);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(path = "/{productName}")
    public ResponseEntity<Catalog> getProductByName(@PathVariable("productName") String productName){

        Catalog productByName = this.catalogService.getProductByName(productName);
        if(productByName == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>( productByName, HttpStatus.OK);

    }

    @GetMapping
    public ResponseEntity<List<Catalog>> getAllProducts(){

        List<Catalog> products = this.catalogService.getProducts();

        return new ResponseEntity<>( products, HttpStatus.OK);

    }


}
