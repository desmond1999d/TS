package by.site.tonservice.sd1.controller;

import by.site.tonservice.sd1.dto.ProductExampleDto;
import by.site.tonservice.sd1.service.ProductExampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigInteger;
import java.util.List;

@RestController
@RequestMapping("api/admin")
public class ProductExampleAdminController {

    private ProductExampleService productExampleService;

    @RequestMapping(value = "/display-order", method = RequestMethod.POST)
    public ResponseEntity updateProductExamplesDisplayOrder(@RequestBody List<ProductExampleDto> productExampleDtos) {
        try {
            productExampleService.updateProductExamplesDisplayOrder(productExampleDtos);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public ResponseEntity deleteProductExample(@RequestParam("productExampleId") BigInteger productExampleId) {
        productExampleService.deleteProductExample(productExampleId);
        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity createProductExample(@RequestBody ProductExampleDto productExampleDto) {
        return ResponseEntity.ok(productExampleService.createProductExample(productExampleDto));
    }

    @RequestMapping(value = "/set-file", method = RequestMethod.POST)
    public ResponseEntity setFile(@RequestParam("file") MultipartFile multipartFile, @RequestParam("productExampleId") BigInteger productExampleId) {
        try {
            return ResponseEntity.ok(productExampleService.setFileToProductExample(multipartFile, productExampleId));
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @Autowired
    public void setProductExampleService(ProductExampleService productExampleService) {
        this.productExampleService = productExampleService;
    }
}
