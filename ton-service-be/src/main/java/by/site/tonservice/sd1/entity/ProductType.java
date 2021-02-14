package by.site.tonservice.sd1.entity;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.List;

@Entity
@Table(name = "product_types")
public class ProductType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PRODUCT_TYPE_ID", unique = true, nullable = false)
    private BigInteger id;
    private String name;
    private String description;
    @OneToMany(mappedBy = "parentId",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            targetEntity = ProductType.class)
    private List<ProductType> children;
    private BigInteger parentId;
    private String thumbnail;

    public ProductType() {
    }

    public ProductType(String name, String description, List<ProductType> children, BigInteger parentId, String thumbnail) {
        this.name = name;
        this.description = description;
        this.children = children;
        this.parentId = parentId;
        this.thumbnail = thumbnail;
    }

    public BigInteger getId() {
        return id;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<ProductType> getChildren() {
        return children;
    }

    public void setChildren(List<ProductType> children) {
        this.children = children;
    }

    public BigInteger getParentId() {
        return parentId;
    }

    public void setParentId(BigInteger parentId) {
        this.parentId = parentId;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }
}
