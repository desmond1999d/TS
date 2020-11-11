package by.site.tonservice.sd1.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "product_types")
public class ProductExample extends Product {

    public ProductExample(String name, Long productTypeId) {
        super(name, productTypeId);
    }
}
