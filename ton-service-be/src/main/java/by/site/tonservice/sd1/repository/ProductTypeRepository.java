package by.site.tonservice.sd1.repository;

import by.site.tonservice.sd1.entity.ProductType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;

@Repository
public interface ProductTypeRepository extends CrudRepository<ProductType, BigInteger> {

    List<ProductType> findAllByParentId(BigInteger parentId);
}
