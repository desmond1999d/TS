package by.site.tonservice.sd1.entity;

import javax.persistence.*;
import java.math.BigInteger;

@Entity
@Table(name = "product_type_examples")
public class ProductExample {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PRODUCT_TYPE_EXAMPLE_ID", unique = true, nullable = false)
    private BigInteger id;
    @Column(name = "PRODUCT_TYPE_ID")
    private BigInteger productTypeId;
    @Column(name = "IMG_SOURCE")
    private String imgSource;
    @Column(name = "COMPANY_NAME")
    private String companyName;
    @Column(name = "DISPLAY_ORDER")
    private int displayOrder;

    public ProductExample() {
    }

    public ProductExample(BigInteger productTypeId, String imgSource, int displayOrder) {
        this.productTypeId = productTypeId;
        this.imgSource = imgSource;
        this.displayOrder = displayOrder;
    }

    public BigInteger getId() {
        return id;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public BigInteger getProductTypeId() {
        return productTypeId;
    }

    public void setProductTypeId(BigInteger productTypeId) {
        this.productTypeId = productTypeId;
    }

    public String getImgSource() {
        return imgSource;
    }

    public void setImgSource(String imgSource) {
        this.imgSource = imgSource;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public int getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(int displayOrder) {
        this.displayOrder = displayOrder;
    }

    @Override
    public String toString() {
        return this.id + " " + this.productTypeId + " " + this.imgSource + " " + this.displayOrder;
    }
}
