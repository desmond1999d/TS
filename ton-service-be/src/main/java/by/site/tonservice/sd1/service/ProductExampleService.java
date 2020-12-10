package by.site.tonservice.sd1.service;

import by.site.tonservice.sd1.dto.ProductExampleDto;

import java.math.BigInteger;
import java.util.List;

public interface ProductExampleService {

    List<ProductExampleDto> getProductExamplesByProductTypeId(BigInteger productTypeId);

    List<ProductExampleDto> getProductCategoryExamples(BigInteger productCategoryId);
}
