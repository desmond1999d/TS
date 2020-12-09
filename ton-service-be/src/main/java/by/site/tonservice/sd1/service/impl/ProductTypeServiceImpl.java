package by.site.tonservice.sd1.service.impl;

import by.site.tonservice.sd1.entity.ProductType;
import by.site.tonservice.sd1.repository.ProductTypeRepository;
import by.site.tonservice.sd1.service.ProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Service
public class ProductTypeServiceImpl implements ProductTypeService {

    private ProductTypeRepository productTypeRepository;

    public List<ProductType> getAllTopLevelProductTypes() {
        return productTypeRepository.findAllByParentIdIsNull();
    }

    public List<ProductType> getAllHorizontalRefs(final BigInteger parentProductTypeId) {
        return productTypeRepository.findAllByParentId(parentProductTypeId);
    }

    @Override
    public ProductType getProductTypeById(BigInteger productTypeId) {
        Optional<ProductType> byId = productTypeRepository.findById(productTypeId);
        if (byId.isPresent()) {
            return byId.get();
        } else {
            throw new RuntimeException("Did not manage to find entry with id = " + productTypeId);
        }
    }

    @Autowired
    public void setProductTypeRepository(ProductTypeRepository productTypeRepository) {
        this.productTypeRepository = productTypeRepository;
    }
}
