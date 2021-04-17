package by.site.tonservice.sd1.service;

import by.site.tonservice.sd1.entity.ProductType;

import java.io.IOException;
import java.math.BigInteger;
import java.util.List;

public interface ProductTypeService {

    List<ProductType> getAllTopLevelProductTypes();

    List<ProductType> getAllTopLevelProductTypesWithThumbnails();

    List<ProductType> getAllTopLevelProductTypesWithExamples();

    List<ProductType> getAllHorizontalRefs(BigInteger parentProductTypeId);

    byte[] getImage(BigInteger id);

    ProductType getProductTypeById(BigInteger productTypeId);

    ProductType updateTypeDescription(String typeDescription, BigInteger productTypeId);
}
