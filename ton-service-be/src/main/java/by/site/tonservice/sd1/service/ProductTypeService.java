package by.site.tonservice.sd1.service;

import by.site.tonservice.sd1.entity.ProductType;

import java.math.BigInteger;
import java.util.List;

public interface ProductTypeService {

    List<ProductType> getAllTopLevelProductTypes();

    List<ProductType> getAllHorizontalRefs(BigInteger parentProductTypeId);

    ProductType getProductTypeById(BigInteger productTypeId);
}
