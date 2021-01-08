package by.site.tonservice.sd1.service.impl;

import org.apache.log4j.Logger;
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
    private static final Logger LOGGER = Logger.getLogger(ProductTypeServiceImpl.class);

    public List<ProductType> getAllTopLevelProductTypes() {
        LOGGER.info("getAllTopLevelProductTypes start");
        return productTypeRepository.findAllByParentIdIsNull();
    }

    public List<ProductType> getAllHorizontalRefs(final BigInteger parentProductTypeId) {
        LOGGER.info("getAllHorizontalRefs start");
        return productTypeRepository.findAllByParentId(parentProductTypeId);
    }

    @Override
    public ProductType getProductTypeById(BigInteger productTypeId) {
        LOGGER.info("getProductTypeById start");
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
