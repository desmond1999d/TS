package by.site.tonservice.sd1.mapper;

import by.site.tonservice.sd1.dto.ProductExampleDto;
import by.site.tonservice.sd1.entity.ProductExample;

import java.util.List;

public interface Mapper<T, M> {

    M map(T t);

    T unmap(M m);

    M mapWithNoPayload(T productExample);

    List<M> map(List<T> t);

    List<M> mapWithNoPayload(List<T> t);
}
