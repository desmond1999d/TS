package by.site.tonservice.sd1.entity;

import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.List;

@Entity
@Table(name = "demesne")
public class Demesne {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "demesne_id", unique = true, nullable = false)
    private BigInteger id;
    private String name;
    @OneToMany(mappedBy = "demesneId",
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL,
            targetEntity = ProductType.class)
    @Where(clause = "enabled = true")
    private List<ProductType> productTypes;
    private boolean enabled;

    public Demesne() {
    }

    public Demesne(String name, List<ProductType> productTypes, boolean enabled) {
        this.name = name;
        this.productTypes = productTypes;
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

    public List<ProductType> getProductTypes() {
        return productTypes;
    }

    public void setProductTypes(List<ProductType> productTypes) {
        this.productTypes = productTypes;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean status) {
        this.enabled = status;
    }
}
