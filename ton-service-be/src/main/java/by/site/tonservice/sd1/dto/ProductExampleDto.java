package by.site.tonservice.sd1.dto;

import by.site.tonservice.sd1.entity.ProductExample;

import java.math.BigInteger;

public class ProductExampleDto {

    private BigInteger id;
    private BigInteger productTypeId;
    private byte[] image;
    private String companyName;
    private int displayOrder;

    public ProductExampleDto() {
    }

    public ProductExampleDto(BigInteger id, BigInteger productTypeId, byte[] image, String companyName, int displayOrder) {
        this.id = id;
        this.productTypeId = productTypeId;
        this.image = image;
        this.companyName = companyName;
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

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
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
}
