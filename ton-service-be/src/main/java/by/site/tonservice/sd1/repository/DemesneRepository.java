package by.site.tonservice.sd1.repository;

import by.site.tonservice.sd1.entity.Demesne;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

@Repository
public interface DemesneRepository extends CrudRepository<Demesne, BigInteger> {

}
