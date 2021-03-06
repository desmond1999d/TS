package by.site.tonservice.sd1.repository;

import by.site.tonservice.sd1.entity.ProductExample;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;

@Repository
public interface ProductExampleRepository extends CrudRepository<ProductExample, BigInteger> {

    List<ProductExample> getAllByProductTypeId(BigInteger productTypeId);

    List<ProductExample> getAllByProductTypeIdAndDisplayOrderLessThan(BigInteger productType, int displayOrder);

    List<ProductExample> getAllByProductTypeIdInAndDisplayOrderLessThan(List<BigInteger> subcategoryIds, int maxDisplayPriority);

    List<ProductExample> findByIdIn(List<BigInteger> ids);
}
