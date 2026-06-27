package by.site.tonservice.sd1.service.impl;

import by.site.tonservice.sd1.dto.ImageMigrationEntryResult;
import by.site.tonservice.sd1.dto.ImageMigrationReport;
import by.site.tonservice.sd1.dto.MigrationStatus;
import by.site.tonservice.sd1.entity.ProductExample;
import by.site.tonservice.sd1.repository.ProductExampleRepository;
import by.site.tonservice.sd1.service.ProductExampleImageMigrationService;
import by.site.tonservice.sd1.util.ImagePathResolver;
import by.site.tonservice.sd1.util.WebpImageConverter;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@Service
public class ProductExampleImageMigrationServiceImpl implements ProductExampleImageMigrationService {

    private static final Logger LOGGER = Logger.getLogger(ProductExampleImageMigrationServiceImpl.class);

    private ProductExampleRepository productExampleRepository;
    private ImagePathResolver imagePathResolver;
    private WebpImageConverter webpImageConverter;

    @Override
    public ImageMigrationReport migrateToWebp(boolean dryRun) {
        List<ProductExample> candidates = productExampleRepository.findAllWithConvertibleImageSource();
        ImageMigrationReport report = new ImageMigrationReport();
        report.setDryRun(dryRun);
        report.setTotalCandidates(candidates.size());

        for (ProductExample example : candidates) {
            ImageMigrationEntryResult entryResult = migrateOne(example, dryRun);
            report.getEntries().add(entryResult);
            incrementCounter(report, entryResult.getStatus());
        }

        LOGGER.info("Image migration finished. dryRun=" + dryRun
                + ", total=" + report.getTotalCandidates()
                + ", converted=" + report.getConverted()
                + ", convertedDbOnly=" + report.getConvertedDbOnly()
                + ", wouldConvert=" + report.getWouldConvert()
                + ", skipped=" + report.getSkipped()
                + ", failed=" + report.getFailed());

        return report;
    }

    public ImageMigrationEntryResult migrateOne(ProductExample example, boolean dryRun) {
        ImageMigrationEntryResult entry = new ImageMigrationEntryResult();
        entry.setProductExampleId(example.getId());
        entry.setProductTypeId(example.getProductTypeId());
        entry.setOriginalImgSource(example.getImgSource());

        try {
            String imgSource = example.getImgSource();
            if (imagePathResolver.isWebp(imgSource)) {
                return finish(entry, MigrationStatus.SKIPPED_ALREADY_WEBP, null, null, null);
            }
            if (!imagePathResolver.isConvertibleExtension(imgSource)) {
                return finish(entry, MigrationStatus.SKIPPED_NOT_CONVERTIBLE, null, null, null);
            }

            Path sourcePath = imagePathResolver.resolveSourceFilePath(imgSource);
            Path targetPath = imagePathResolver.resolveTargetFilePath(example.getProductTypeId(), imgSource);
            String newImgSource = imagePathResolver.toWebpUrlPath(example.getProductTypeId(), imgSource);

            entry.setSourceFilePath(sourcePath.toString());
            entry.setTargetFilePath(targetPath.toString());
            entry.setNewImgSource(newImgSource);

            if (!Files.exists(sourcePath)) {
                return finish(entry, MigrationStatus.SKIPPED_MISSING_FILE, null, null,
                        "Source file not found: " + sourcePath);
            }

            if (dryRun) {
                return finish(entry, MigrationStatus.WOULD_CONVERT, null, null, null);
            }

            if (Files.exists(targetPath)) {
                updateImgSource(example, newImgSource);
                return finish(entry, MigrationStatus.CONVERTED_DB_ONLY, newImgSource, targetPath.toString(), null);
            }

            Files.createDirectories(targetPath.getParent());
            try (InputStream inputStream = Files.newInputStream(sourcePath)) {
                byte[] webpContent = webpImageConverter.toWebp(inputStream);
                Files.write(targetPath, webpContent);
            }

            updateImgSource(example, newImgSource);
            return finish(entry, MigrationStatus.CONVERTED, newImgSource, targetPath.toString(), null);
        } catch (Exception e) {
            LOGGER.error("Failed to migrate product example id=" + example.getId(), e);
            return finish(entry, MigrationStatus.FAILED, entry.getNewImgSource(), entry.getTargetFilePath(), e.getMessage());
        }
    }

    private void updateImgSource(ProductExample example, String newImgSource) {
        example.setImgSource(newImgSource);
        productExampleRepository.save(example);
    }

    private ImageMigrationEntryResult finish(ImageMigrationEntryResult entry,
                                             MigrationStatus status,
                                             String newImgSource,
                                             String targetFilePath,
                                             String message) {
        entry.setStatus(status);
        if (newImgSource != null) {
            entry.setNewImgSource(newImgSource);
        }
        if (targetFilePath != null) {
            entry.setTargetFilePath(targetFilePath);
        }
        entry.setMessage(message);
        return entry;
    }

    private void incrementCounter(ImageMigrationReport report, MigrationStatus status) {
        switch (status) {
            case CONVERTED:
                report.setConverted(report.getConverted() + 1);
                break;
            case CONVERTED_DB_ONLY:
                report.setConvertedDbOnly(report.getConvertedDbOnly() + 1);
                break;
            case WOULD_CONVERT:
                report.setWouldConvert(report.getWouldConvert() + 1);
                break;
            case FAILED:
                report.setFailed(report.getFailed() + 1);
                break;
            default:
                report.setSkipped(report.getSkipped() + 1);
                break;
        }
    }

    @Autowired
    public void setProductExampleRepository(ProductExampleRepository productExampleRepository) {
        this.productExampleRepository = productExampleRepository;
    }

    @Autowired
    public void setImagePathResolver(ImagePathResolver imagePathResolver) {
        this.imagePathResolver = imagePathResolver;
    }

    @Autowired
    public void setWebpImageConverter(WebpImageConverter webpImageConverter) {
        this.webpImageConverter = webpImageConverter;
    }
}
