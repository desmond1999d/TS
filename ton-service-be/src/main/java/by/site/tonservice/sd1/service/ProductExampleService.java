package by.site.tonservice.sd1.service;

import by.site.tonservice.sd1.dto.ProductExampleDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigInteger;
import java.util.List;

public interface ProductExampleService {

    List<ProductExampleDto> getProductExamplesByProductTypeId(BigInteger productTypeId);

    List<ProductExampleDto> getProductExamplesByProductTypeIdWithoutPayload(BigInteger productTypeId);

    List<ProductExampleDto> getProductCategoryExamples(BigInteger productCategoryId);

    List<ProductExampleDto> getProductCategoryExamplesWithoutPayload(BigInteger productCategoryId);

    ProductExampleDto getProductCategoryExampleById(BigInteger productExampleId);

    void updateProductExamplesDisplayOrder(List<ProductExampleDto> productExampleWithNewDisplayOrder) throws RuntimeException;

    ProductExampleDto setFileToProductExample(MultipartFile multipartFile, BigInteger productExampleId) throws RuntimeException, IOException;

    ProductExampleDto createProductExample(ProductExampleDto productExampleDto);

    void deleteProductExample(BigInteger productExampleId);

    byte[] getImage(BigInteger id);
}
