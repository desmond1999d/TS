package by.site.tonservice.sd1.service.impl;

import by.site.tonservice.sd1.dto.ProductExampleDto;
import by.site.tonservice.sd1.entity.ProductExample;
import by.site.tonservice.sd1.mapper.Mapper;
import by.site.tonservice.sd1.mapper.ProductExampleMapper;
import by.site.tonservice.sd1.repository.ProductExampleRepository;
import by.site.tonservice.sd1.service.ProductExampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductExampleServiceImpl implements ProductExampleService {

    private ProductExampleRepository productExampleRepository;
    private Mapper<ProductExample, ProductExampleDto> productExampleMapper;

    @Override
    public List<ProductExampleDto> getProductExamplesByProductTypeId(BigInteger productTypeId) {
        List<ProductExample> allExamplesByProductTypeId = productExampleRepository.getAllByProductTypeId(productTypeId);
        List<ProductExampleDto> result = new ArrayList<>();
        for (ProductExample productExample : allExamplesByProductTypeId) {
            result.add(productExampleMapper.map(productExample));
        }
        return result;
    }

    @Autowired
    public void setProductExampleRepository(ProductExampleRepository productExampleRepository) {
        this.productExampleRepository = productExampleRepository;
    }

    @Autowired
    public void setProductExampleMapper(Mapper<ProductExample, ProductExampleDto> productExampleMapper) {
        this.productExampleMapper = productExampleMapper;
    }
}
