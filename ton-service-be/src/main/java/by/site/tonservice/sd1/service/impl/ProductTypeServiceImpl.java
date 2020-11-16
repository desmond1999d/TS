package by.site.tonservice.sd1.service.impl;

import by.site.tonservice.sd1.entity.ProductType;
import by.site.tonservice.sd1.repository.ProductTypeRepository;
import by.site.tonservice.sd1.service.ProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;

@Service
public class ProductTypeServiceImpl implements ProductTypeService {

    private ProductTypeRepository productTypeRepository;

    public List<ProductType> getAllTopLevelProductTypes() {
        return productTypeRepository.findAllByParentId(null);
    }

    public List<ProductType> getAllHorizontalRefs(final BigInteger parentProductTypeId) {
        return productTypeRepository.findAllByParentId(parentProductTypeId);
    }

    @Autowired
    public void setProductTypeRepository(ProductTypeRepository productTypeRepository) {
        this.productTypeRepository = productTypeRepository;
    }
}
