package com.gospodinovi.service;

import com.gospodinovi.models.Catalog;
import com.gospodinovi.repository.CatalogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class CatalogService {

    @Autowired
    private CatalogRepository catalogRepository;

    public void saveProduct(final Catalog catalog){
        Catalog product = this.catalogRepository.findFirstByName(catalog.getName()).orElse(null);
        if(product != null){
            return;
        }
        if(catalog.getName().equals(null) || catalog.getName().equals("")){
            return;
        }
        this.catalogRepository.save(catalog);

    }

    public void saveProductImage(MultipartFile file, String productName) {
        Catalog product = this.catalogRepository.findFirstByName(productName).orElse(null);
        if(product!= null){
            try {
                product.setImage(file.getBytes());
                this.catalogRepository.flush();
            } catch (IOException e) {
                throw new RuntimeException("File not readable");
            }
        }
    }

    public List<Catalog> getProducts() {
        return this.catalogRepository.findAll();
    }

    public Catalog getProductByName(String productName) {
        return this.catalogRepository.findFirstByName(productName).orElse(null);
    }
}
