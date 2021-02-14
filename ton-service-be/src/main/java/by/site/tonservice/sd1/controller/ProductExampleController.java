package by.site.tonservice.sd1.controller;

import by.site.tonservice.sd1.dto.ProductExampleDto;
import by.site.tonservice.sd1.service.ProductExampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

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

    @RequestMapping(value = "/np", method = RequestMethod.GET)
    public List<ProductExampleDto> getAllNp(@Param("productTypeId") BigInteger productTypeId) {
        return productExampleService.getProductExamplesByProductTypeIdWithoutPayload(productTypeId);
    }

    @RequestMapping(value = "/category-examples", method = RequestMethod.GET)
    public List<ProductExampleDto> getCategoryPreview(@Param("productTypeId") BigInteger productTypeId) {
        return productExampleService.getProductCategoryExamples(productTypeId);
    }

    @RequestMapping(value = "/category-examples-np", method = RequestMethod.GET)
    public List<ProductExampleDto> getCategoryPreviewNp(@Param("productTypeId") BigInteger productTypeId) {
        return productExampleService.getProductCategoryExamplesWithoutPayload(productTypeId);
    }

    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ProductExampleDto getProductCategoryExampleById(@Param("id") BigInteger id) {
        return productExampleService.getProductCategoryExampleById(id);
    }

    @RequestMapping(value = "/image", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody
    byte[] getImage(@RequestParam BigInteger id) {
        return productExampleService.getImage(id);
    }

    @Autowired
    public void setProductExampleService(ProductExampleService productExampleService) {
        this.productExampleService = productExampleService;
    }
}
