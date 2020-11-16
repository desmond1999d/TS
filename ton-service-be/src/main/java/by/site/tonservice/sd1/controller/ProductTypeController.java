package by.site.tonservice.sd1.controller;

import by.site.tonservice.sd1.entity.ProductType;
import by.site.tonservice.sd1.service.ProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;
import java.util.List;

@RestController
@RequestMapping("api/product-types")
public class ProductTypeController {

    private ProductTypeService productTypeService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<ProductType> getAll() {
        return productTypeService.getAllTopLevelProductTypes();
    }

    @RequestMapping(value = "/horizontal-reference", method = RequestMethod.GET)
    public List<ProductType> getHorizontalReferences(@RequestParam BigInteger productTypeId) {
        return productTypeService.getAllHorizontalRefs(productTypeId);
    }

    @Autowired
    public void setProductTypeService(ProductTypeService productTypeService) {
        this.productTypeService = productTypeService;
    }
}
