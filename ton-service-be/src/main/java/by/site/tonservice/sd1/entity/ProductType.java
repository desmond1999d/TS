package by.site.tonservice.sd1.entity;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.List;

@Entity
@Table(name = "product_types")
public class ProductType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger id;
    private String name;
    private String description;
    private List<ProductType> children;
    private ProductType parent;

    public ProductType(String name, String description, List<ProductType> children, ProductType parent) {
        this.name = name;
        this.description = description;
        this.children = children;
        this.parent = parent;
    }

    public ProductType(String name, List<ProductType> children, String description) {
        this.name = name;
        this.description = description;
        this.children = children;
    }

    public BigInteger getId() {
        return this.id;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public List<ProductType> getChildren() {
        return children;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setChildren(List<ProductType> children) {
        this.children = children;
    }

    public ProductType getParent() {
        return parent;
    }

    public void setParent(ProductType parent) {
        this.parent = parent;
    }
}
