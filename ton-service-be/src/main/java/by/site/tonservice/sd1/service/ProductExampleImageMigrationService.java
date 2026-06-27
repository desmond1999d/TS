package by.site.tonservice.sd1.service;

import by.site.tonservice.sd1.dto.ImageMigrationReport;

public interface ProductExampleImageMigrationService {

    ImageMigrationReport migrateToWebp(boolean dryRun);
}
