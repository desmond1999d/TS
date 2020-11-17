package by.site.tonservice.sd1.repository;

import by.site.tonservice.sd1.entity.ProductExample;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

@Repository
public interface ProductExampleRepository extends CrudRepository<ProductExample, BigInteger> {
}
