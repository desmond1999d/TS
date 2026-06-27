package by.site.tonservice.sd1.dto;

import java.math.BigInteger;

public class ImageMigrationEntryResult {

    private BigInteger productExampleId;
    private BigInteger productTypeId;
    private String originalImgSource;
    private String newImgSource;
    private String sourceFilePath;
    private String targetFilePath;
    private MigrationStatus status;
    private String message;

    public BigInteger getProductExampleId() {
        return productExampleId;
    }

    public void setProductExampleId(BigInteger productExampleId) {
        this.productExampleId = productExampleId;
    }

    public BigInteger getProductTypeId() {
        return productTypeId;
    }

    public void setProductTypeId(BigInteger productTypeId) {
        this.productTypeId = productTypeId;
    }

    public String getOriginalImgSource() {
        return originalImgSource;
    }

    public void setOriginalImgSource(String originalImgSource) {
        this.originalImgSource = originalImgSource;
    }

    public String getNewImgSource() {
        return newImgSource;
    }

    public void setNewImgSource(String newImgSource) {
        this.newImgSource = newImgSource;
    }

    public String getSourceFilePath() {
        return sourceFilePath;
    }

    public void setSourceFilePath(String sourceFilePath) {
        this.sourceFilePath = sourceFilePath;
    }

    public String getTargetFilePath() {
        return targetFilePath;
    }

    public void setTargetFilePath(String targetFilePath) {
        this.targetFilePath = targetFilePath;
    }

    public MigrationStatus getStatus() {
        return status;
    }

    public void setStatus(MigrationStatus status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
