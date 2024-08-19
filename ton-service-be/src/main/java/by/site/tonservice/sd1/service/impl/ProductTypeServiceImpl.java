package by.site.tonservice.sd1.service.impl;

import by.site.tonservice.sd1.entity.ProductExample;
import by.site.tonservice.sd1.entity.ProductType;
import by.site.tonservice.sd1.repository.ProductExampleRepository;
import by.site.tonservice.sd1.repository.ProductTypeRepository;
import by.site.tonservice.sd1.service.ProductTypeService;
import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.math.BigInteger;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductTypeServiceImpl implements ProductTypeService {

    private ProductTypeRepository productTypeRepository;
    private ProductExampleRepository productExampleRepository;
    private static final Logger LOGGER = Logger.getLogger(ProductTypeServiceImpl.class);

    public List<ProductType> getAllTopLevelProductTypes() {
        LOGGER.info("getAllTopLevelProductTypes start");
        return productTypeRepository.findAllByParentIdIsNull().stream().filter(ProductType::isEnabled).collect(Collectors.toList());
    }

    @Override
    public List<ProductType> getAllTopLevelProductTypesWithThumbnails() {
        List<ProductType> productTypes = productTypeRepository.findAllByParentIdIsNull().stream().filter(ProductType::isEnabled).collect(Collectors.toList());
        for (ProductType productType : productTypes) {
            productType.setThumbnail("/api/product-types/image?id=" + productType.getId());
        }
        return productTypes;
    }

    @Override
    public List<ProductType> getAllTopLevelProductTypesWithExamples() {
        List<ProductType> topLevelOfferings = productTypeRepository.findAllByParentIdIsNull().stream().filter(ProductType::isEnabled).collect(Collectors.toList());
        for (ProductType topLevelOffering : topLevelOfferings) {
            topLevelOffering.setThumbnail(null);
            BigInteger productTypeId = topLevelOffering.getChildren().iterator().next().getId();
            List<ProductExample> productTypeExamples = productExampleRepository.getAllByProductTypeIdAndDisplayOrderLessThan(productTypeId, 1);
            if (!productTypeExamples.isEmpty()) {
                ProductExample preferredExample = productTypeExamples.iterator().next();
                topLevelOffering.setThumbnail("/api/product-examples/image?id=" + preferredExample.getId());
            }
        }
        return topLevelOfferings;
    }

    public List<ProductType> getAllHorizontalRefs(final BigInteger parentProductTypeId) {
        LOGGER.info("getAllHorizontalRefs start");
        return productTypeRepository.findAllByParentId(parentProductTypeId).stream().filter(ProductType::isEnabled).collect(Collectors.toList());
    }

    @Override
    public byte[] getImage(BigInteger id) {
        Optional<ProductType> productTypeOptional = productTypeRepository.findById(id).filter(ProductType::isEnabled);
        if (productTypeOptional.isPresent() && productTypeOptional.get().getThumbnail() != null) {
            try {
                return FileUtils.readFileToByteArray(new File(productTypeOptional.get().getThumbnail()));
            } catch (IOException e) {
                return null;
            }
        }
        return null;
    }

    @Override
    public ProductType getProductTypeById(BigInteger productTypeId) {
        LOGGER.info("getProductTypeById start");
        Optional<ProductType> byId = productTypeRepository.findById(productTypeId).filter(ProductType::isEnabled);
        if (byId.isPresent()) {
            return byId.get();
        } else {
            throw new RuntimeException("Did not manage to find entry with id = " + productTypeId);
        }
    }

    @Override
    public ProductType updateTypeDescription(String typeDescription, BigInteger productTypeId) {
        Optional<ProductType> productType = productTypeRepository.findById(productTypeId);
        if (productType.isPresent()) {
            productType.get().setTypeDescription(typeDescription);
            productTypeRepository.save(productType.get());
            return productType.get();
        }
        return null;
    }

    @Autowired
    public void setProductTypeRepository(ProductTypeRepository productTypeRepository) {
        this.productTypeRepository = productTypeRepository;
    }

    @Autowired
    public void setProductExampleRepository(ProductExampleRepository productExampleRepository) {
        this.productExampleRepository = productExampleRepository;
    }
}
