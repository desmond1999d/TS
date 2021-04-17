package by.site.tonservice.sd1.controller;

import by.site.tonservice.sd1.entity.ProductType;
import by.site.tonservice.sd1.service.ProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

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

    @RequestMapping(value = "/thumbnails", method = RequestMethod.GET)
    public List<ProductType> getAllWithThumbnails() {
        return productTypeService.getAllTopLevelProductTypesWithThumbnails();
    }

    @RequestMapping(value = "/with-example", method = RequestMethod.GET)
    public List<ProductType> getAllWithExamples() {
        return productTypeService.getAllTopLevelProductTypesWithExamples();
    }

    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ProductType getById(@RequestParam BigInteger productTypeId) {
        return productTypeService.getProductTypeById(productTypeId);
    }

    @RequestMapping(value = "/horizontal-reference", method = RequestMethod.GET)
    public List<ProductType> getHorizontalReferences(@RequestParam BigInteger productTypeId) {
        return productTypeService.getAllHorizontalRefs(productTypeId);
    }

    @RequestMapping(value = "/image", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getImage(@RequestParam BigInteger id) {
        return productTypeService.getImage(id);
    }

    @RequestMapping(value = "/update-description", method = RequestMethod.GET)
    public ProductType getImage(@RequestParam BigInteger productTypeId, @RequestParam String typeDescription) {
        return productTypeService.updateTypeDescription(typeDescription, productTypeId);
    }

    @Autowired
    public void setProductTypeService(ProductTypeService productTypeService) {
        this.productTypeService = productTypeService;
    }
}
