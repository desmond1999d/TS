package by.site.tonservice.sd1.controller;

import by.site.tonservice.sd1.dto.ProductExampleDto;
import by.site.tonservice.sd1.dto.ImageMigrationReport;
import by.site.tonservice.sd1.service.ProductExampleImageMigrationService;
import by.site.tonservice.sd1.service.ProductExampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
    private ProductExampleImageMigrationService productExampleImageMigrationService;
    private boolean imageMigrationEnabled;

    @RequestMapping(value = "/migrate-images-to-webp", method = RequestMethod.POST)
    public ResponseEntity migrateImagesToWebp(@RequestParam("dryRun") Boolean dryRun) {
        if (!imageMigrationEnabled) {
            return ResponseEntity.status(403).build();
        }
        if (dryRun == null) {
            return ResponseEntity.badRequest().build();
        }
        ImageMigrationReport report = productExampleImageMigrationService.migrateToWebp(dryRun);
        return ResponseEntity.ok(report);
    }

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

    @Autowired
    public void setProductExampleImageMigrationService(ProductExampleImageMigrationService productExampleImageMigrationService) {
        this.productExampleImageMigrationService = productExampleImageMigrationService;
    }

    @Value("${app.image.migration.enabled:false}")
    public void setImageMigrationEnabled(boolean imageMigrationEnabled) {
        this.imageMigrationEnabled = imageMigrationEnabled;
    }
}
