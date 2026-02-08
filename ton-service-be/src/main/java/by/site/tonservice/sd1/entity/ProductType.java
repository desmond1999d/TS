package by.site.tonservice.sd1.entity;

import org.hibernate.annotations.Where;

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
    @Where(clause = "enabled = true")
    private List<ProductType> children;
    private BigInteger parentId;
    private String thumbnail;
    @JoinColumn(name = "demesne_id")
    private BigInteger demesneId;
    @Column(name = "hide_in_tree")
    private boolean hideInTree;
    @Column(name = "display_order")
    private BigInteger displayOrder;
    @Column(name = "type_description")
    private String typeDescription;
    private boolean enabled;

    public ProductType() {
    }

    public ProductType(String name, String description,
                       List<ProductType> children, BigInteger parentId,
                       String thumbnail, BigInteger demesneId,
                       boolean hideInTree, BigInteger displayOrder,
                       String typeDescription, boolean enabled) {
        this.name = name;
        this.description = description;
        this.children = children;
        this.parentId = parentId;
        this.thumbnail = thumbnail;
        this.demesneId = demesneId;
        this.hideInTree = hideInTree;
        this.displayOrder = displayOrder;
        this.typeDescription = typeDescription;
        this.enabled = enabled;
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

    public boolean isHideInTree() {
        return hideInTree;
    }

    public void setHideInTree(boolean hideInTree) {
        this.hideInTree = hideInTree;
    }

    public BigInteger getDemesneId() {
        return demesneId;
    }

    public void setDemesneId(BigInteger demesneId) {
        this.demesneId = demesneId;
    }

    public BigInteger getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(BigInteger displayOrder) {
        this.displayOrder = displayOrder;
    }

    public String getTypeDescription() {
        return typeDescription;
    }

    public void setTypeDescription(String typeDescription) {
        this.typeDescription = typeDescription;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean status) {
        this.enabled = status;
    }
}
