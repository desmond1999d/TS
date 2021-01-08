package by.site.tonservice.sd1.mapper;

import java.util.List;

public interface Mapper<T, M> {

    M map(T t);

    List<M> map(List<T> t);

    List<M> mapWithNoPayload(List<T> t);
}
