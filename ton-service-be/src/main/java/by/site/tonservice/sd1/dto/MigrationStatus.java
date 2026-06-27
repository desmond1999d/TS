package by.site.tonservice.sd1.dto;

public enum MigrationStatus {
    WOULD_CONVERT,
    CONVERTED,
    CONVERTED_DB_ONLY,
    SKIPPED_ALREADY_WEBP,
    SKIPPED_NOT_CONVERTIBLE,
    SKIPPED_MISSING_FILE,
    FAILED
}
