package by.site.tonservice.sd1.service.impl;

import by.site.tonservice.sd1.dto.ProductExampleDto;
import by.site.tonservice.sd1.entity.ProductExample;
import by.site.tonservice.sd1.entity.ProductType;
import by.site.tonservice.sd1.mapper.Mapper;
import by.site.tonservice.sd1.repository.ProductExampleRepository;
import by.site.tonservice.sd1.repository.ProductTypeRepository;
import by.site.tonservice.sd1.service.ProductExampleService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductExampleServiceImpl implements ProductExampleService {

    private ProductExampleRepository productExampleRepository;
    private ProductTypeRepository productTypeRepository;
    private Mapper<ProductExample, ProductExampleDto> productExampleMapper;
    private static final Logger LOGGER = Logger.getLogger(ProductExampleServiceImpl.class);

    private static final int MAX_PREVIEW_PRIORITY = 5;

    @Override
    public List<ProductExampleDto> getProductExamplesByProductTypeId(BigInteger productTypeId) {
        LOGGER.info("getProductExamplesByProductTypeId start");
        List<ProductExample> allExamplesByProductTypeId = productExampleRepository.getAllByProductTypeId(productTypeId);
        LOGGER.info("getProductExamplesByProductTypeId end");
        return productExampleMapper.map(allExamplesByProductTypeId);
    }

    @Override
    public List<ProductExampleDto> getProductExamplesByProductTypeIdWithoutPayload(BigInteger productTypeId) {
        LOGGER.info("getProductExamplesByProductTypeId start");
        List<ProductExample> allExamplesByProductTypeId = productExampleRepository.getAllByProductTypeId(productTypeId);
        LOGGER.info("getProductExamplesByProductTypeId end");
        return productExampleMapper.mapWithNoPayload(allExamplesByProductTypeId);
    }

    @Override
    public List<ProductExampleDto> getProductCategoryExamples(BigInteger productCategoryId) {
        LOGGER.info("getProductCategoryExamples start");
        List<ProductExample> productCategoryExamplesUnmapped = getProductCategoryExamplesUnmapped(productCategoryId);
        LOGGER.info("getProductCategoryExamples end");
        return productExampleMapper.map(productCategoryExamplesUnmapped);
    }

    @Override
    public List<ProductExampleDto> getProductCategoryExamplesWithoutPayload(BigInteger productCategoryId) {
        LOGGER.info("getProductCategoryExamples start");
        List<ProductExample> productCategoryExamplesUnmapped = getProductCategoryExamplesUnmapped(productCategoryId);
        LOGGER.info("getProductCategoryExamples end");
        return productExampleMapper.mapWithNoPayload(productCategoryExamplesUnmapped);
    }

    private List<ProductExample> getProductCategoryExamplesUnmapped(BigInteger productCategoryId) {
        LOGGER.info("getProductCategoryExamplesUnmapped start");
        List<BigInteger> subcategories = productTypeRepository.findAllByParentId(productCategoryId)
                .stream()
                .map(ProductType::getId)
                .collect(Collectors.toList());
        List<ProductExample> categoryExamplesPreview = null;
        if (!subcategories.isEmpty()) {
            categoryExamplesPreview =
                    productExampleRepository.getAllByProductTypeIdInAndDisplayOrderLessThan(subcategories, MAX_PREVIEW_PRIORITY);
        } else {
            categoryExamplesPreview = productExampleRepository.getAllByProductTypeId(productCategoryId);
        }
        LOGGER.info("getProductCategoryExamplesUnmapped end");
        return categoryExamplesPreview;
    }

    @Override
    public ProductExampleDto getProductCategoryExampleById(BigInteger productExampleId) {
        LOGGER.info("getProductCategoryExamplesById start");
        Optional<ProductExample> productExample = productExampleRepository.findById(productExampleId);
        if (!productExample.isPresent()) {
            throw new RuntimeException("Product example with id = " + productExampleId + " was not found");
        }
        return productExampleMapper.map(productExample.get());
    }

    @Autowired
    public void setProductExampleRepository(ProductExampleRepository productExampleRepository) {
        this.productExampleRepository = productExampleRepository;
    }

    @Autowired
    public void setProductExampleMapper(Mapper<ProductExample, ProductExampleDto> productExampleMapper) {
        this.productExampleMapper = productExampleMapper;
    }

    @Autowired
    public void setProductTypeRepository(ProductTypeRepository productTypeRepository) {
        this.productTypeRepository = productTypeRepository;
    }
}
