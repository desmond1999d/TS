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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigInteger;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static by.site.tonservice.sd1.service.impl.DbInitializerImpl.BASE_DIR;

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

    @Override
    public void updateProductExamplesDisplayOrder(List<ProductExampleDto> productExampleWithNewDisplayOrder) throws RuntimeException {
        List<ProductExample> productExamples = productExampleRepository.findByIdIn(productExampleWithNewDisplayOrder
                .stream()
                .map(ProductExampleDto::getId)
                .collect(Collectors.toList()));
        productExamples.forEach(example ->
                productExampleWithNewDisplayOrder
                        .stream()
                        .filter(newDisplayOrder -> example.getId().equals(newDisplayOrder.getId()))
                        .findFirst()
                        .ifPresent(newDisplayOrder -> example.setDisplayOrder(newDisplayOrder.getDisplayOrder()))
        );
        productExampleRepository.saveAll(productExamples);
    }

    @Override
    public ProductExampleDto setFileToProductExample(MultipartFile multipartFile, BigInteger productExampleId) throws RuntimeException, IOException {
        Optional<ProductExample> productExample = productExampleRepository.findById(productExampleId);
        if (multipartFile != null && productExample.isPresent()) {
            String dir = BASE_DIR + "/" + productExample.get().getProductTypeId();
            Path path = saveFile(dir, multipartFile.getOriginalFilename(), multipartFile);
            productExample.get().setImgSource(path.toString());
            productExampleRepository.save(productExample.get());
            return productExampleMapper.map(productExample.get());
        }
        throw new RuntimeException();
    }

    private Path saveFile(String uploadDir, String fileName,
                          MultipartFile multipartFile) throws IOException {
        Path uploadPath = Paths.get(uploadDir);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        try (InputStream inputStream = multipartFile.getInputStream()) {
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
            return filePath;
        } catch (IOException ioe) {
            throw new IOException("Could not save image file: " + fileName, ioe);
        }
    }

    @Override
    public ProductExampleDto createProductExample(ProductExampleDto productExampleDto) {
        return productExampleMapper.mapWithNoPayload(productExampleRepository.save(productExampleMapper.unmap(productExampleDto)));
    }

    @Override
    public void deleteProductExample(BigInteger productExampleId) {
        productExampleRepository.deleteById(productExampleId);
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
