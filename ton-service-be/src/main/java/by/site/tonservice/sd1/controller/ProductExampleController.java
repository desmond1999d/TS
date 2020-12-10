package by.site.tonservice.sd1.controller;

import by.site.tonservice.sd1.dto.ProductExampleDto;
import by.site.tonservice.sd1.service.ProductExampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;
import java.util.List;

@RestController
@RequestMapping("api/product-examples")
public class ProductExampleController {

    private ProductExampleService productExampleService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<ProductExampleDto> getAll(@Param("productTypeId") BigInteger productTypeId) {
        return productExampleService.getProductExamplesByProductTypeId(productTypeId);
    }

    @RequestMapping(value = "/category-examples", method = RequestMethod.GET)
    public List<ProductExampleDto> getCategoryPreview(@Param("productTypeId") BigInteger productTypeId) {
        return productExampleService.getProductCategoryExamples(productTypeId);
    }

    @Autowired
    public void setProductExampleService(ProductExampleService productExampleService) {
        this.productExampleService = productExampleService;
    }
}
