package by.site.tonservice.sd1.mapper;

import by.site.tonservice.sd1.dto.ProductExampleDto;
import by.site.tonservice.sd1.entity.ProductExample;
import by.site.tonservice.sd1.service.impl.ProductExampleServiceImpl;
import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductExampleMapper implements Mapper<ProductExample, ProductExampleDto> {

    private static final Logger LOGGER = Logger.getLogger(ProductExampleServiceImpl.class);

    public ProductExampleDto map(ProductExample productExample) {
        ProductExampleDto productExampleDto = mapWithNoPayload(productExample);
        addPayload(productExampleDto, productExample);
        return productExampleDto;
    }

    private ProductExampleDto mapWithNoPayload(ProductExample productExample) {
        ProductExampleDto productExampleDto = new ProductExampleDto();
        productExampleDto.setId(productExample.getId());
        productExampleDto.setProductTypeId(productExample.getProductTypeId());
        productExampleDto.setCompanyName(productExample.getCompanyName());
        productExampleDto.setDisplayOrder(productExample.getDisplayOrder());
        return productExampleDto;
    }

    private void addPayload(ProductExampleDto productExampleDto, ProductExample productExample) {
        try {
            // TODO: Add cache if possible
            productExampleDto.setImage(FileUtils.readFileToByteArray(new File(productExample.getImgSource())));
        } catch (IOException exception) {
            exception.printStackTrace();
        }
    }

    @Override
    public List<ProductExampleDto> map(List<ProductExample> t) {
        LOGGER.info("map start");
        List<ProductExampleDto> result = new ArrayList<>();
        for (ProductExample productExample : t) {
            result.add(map(productExample));
        }
        LOGGER.info("map end");
        return result;
    }

    @Override
    public List<ProductExampleDto> mapWithNoPayload(List<ProductExample> t) {
        LOGGER.info("mapWithNoPayload start");
        List<ProductExampleDto> result = new ArrayList<>();
        for (ProductExample productExample : t) {
            result.add(mapWithNoPayload(productExample));
        }
        LOGGER.info("mapWithNoPayload end");
        return result;
    }

}
