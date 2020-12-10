package by.site.tonservice.sd1.mapper;

import by.site.tonservice.sd1.dto.ProductExampleDto;
import by.site.tonservice.sd1.entity.ProductExample;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductExampleMapper implements Mapper<ProductExample, ProductExampleDto> {

    public ProductExampleDto map(ProductExample productExample) {
        ProductExampleDto productExampleDto = new ProductExampleDto();
        productExampleDto.setId(productExample.getId());
        productExampleDto.setProductTypeId(productExample.getProductTypeId());
        productExampleDto.setCompanyName(productExample.getCompanyName());
        productExampleDto.setDisplayOrder(productExample.getDisplayOrder());
        try {
            // TODO: Add cache if possible
            productExampleDto.setImage(FileUtils.readFileToByteArray(new File(productExample.getImgSource())));
        } catch (IOException exception) {
            exception.printStackTrace();
            return null;
        }
        return productExampleDto;
    }

    @Override
    public List<ProductExampleDto> map(List<ProductExample> t) {
        List<ProductExampleDto> result = new ArrayList<>();
        for (ProductExample productExample : t) {
            result.add(map(productExample));
        }
        return result;
    }

}
