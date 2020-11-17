package by.site.tonservice.sd1.service.impl;

import by.site.tonservice.sd1.entity.ProductExample;
import by.site.tonservice.sd1.repository.ProductExampleRepository;
import by.site.tonservice.sd1.service.DbInitializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigInteger;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class DbInitializerImpl implements DbInitializer {

    private static final String BASE_DIR = "C:/Users/desmond1999d/Documents/Workspace/Examples";

    private ProductExampleRepository productExampleRepository;

    @Override
    public void initProductExamples() {
        try {
            AtomicInteger order = new AtomicInteger();
            Files.walk(Paths.get(BASE_DIR)).forEach(path -> {
                try {
                    BigInteger productTypeId = new BigInteger(path.getName(path.getNameCount() - 2).toString());
                    ProductExample productExample = new ProductExample(productTypeId, path.toString(), order.getAndAdd(1));
                    productExampleRepository.save(productExample);
                } catch (NumberFormatException e) {
                    order.set(0);
                }
            });
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Autowired
    public void setProductExampleRepository(ProductExampleRepository productExampleRepository) {
        this.productExampleRepository = productExampleRepository;
    }
}
