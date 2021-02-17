package by.site.tonservice.sd1.entity;

import javax.persistence.*;
import java.math.BigInteger;

@Entity
@Table(name = "demesne")
public class Demesne {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "demesne_id", unique = true, nullable = false)
    private BigInteger id;
    private String name;

    public Demesne() {
    }

    public Demesne(String name) {
        this.name = name;
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
}
