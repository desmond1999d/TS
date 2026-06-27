package by.site.tonservice.sd1.util;

import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Locale;

import static by.site.tonservice.sd1.service.impl.DbInitializerImpl.FILE_BASE_DIR;
import static by.site.tonservice.sd1.service.impl.DbInitializerImpl.URL_BASE_DIR;

@Component
public class ImagePathResolver {

    private static final String EXAMPLES_SEGMENT = "/Examples/";

    public boolean isWebp(String imgSource) {
        return hasExtension(imgSource, ".webp");
    }

    public boolean isConvertibleExtension(String imgSource) {
        if (imgSource == null || imgSource.trim().isEmpty()) {
            return false;
        }
        String lower = imgSource.toLowerCase(Locale.ROOT);
        return lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".png");
    }

    public Path resolveSourceFilePath(String imgSource) {
        if (imgSource == null || imgSource.trim().isEmpty()) {
            throw new IllegalArgumentException("Image source is required");
        }
        String relativePath = toRelativeExamplesPath(imgSource);
        return Paths.get(FILE_BASE_DIR, relativePath).normalize();
    }

    public String toWebpUrlPath(BigInteger productTypeId, String originalImgSource) {
        String fileName = extractFileName(originalImgSource);
        String webpFileName = WebpImageConverter.toWebpFileName(fileName);
        return URL_BASE_DIR + "/" + productTypeId + "/" + webpFileName;
    }

    public Path resolveTargetFilePath(BigInteger productTypeId, String originalImgSource) {
        String fileName = extractFileName(originalImgSource);
        String webpFileName = WebpImageConverter.toWebpFileName(fileName);
        return Paths.get(FILE_BASE_DIR, productTypeId.toString(), webpFileName).normalize();
    }

    private String toRelativeExamplesPath(String imgSource) {
        String normalized = imgSource.replace('\\', '/');

        int examplesIndex = normalized.indexOf(EXAMPLES_SEGMENT);
        if (examplesIndex >= 0) {
            return normalized.substring(examplesIndex + EXAMPLES_SEGMENT.length());
        }

        if (normalized.startsWith(URL_BASE_DIR + "/")) {
            return normalized.substring((URL_BASE_DIR + "/").length());
        }

        while (normalized.startsWith("../")) {
            normalized = normalized.substring(3);
        }
        return normalized;
    }

    private String extractFileName(String imgSource) {
        String normalized = imgSource.replace('\\', '/');
        int lastSlash = normalized.lastIndexOf('/');
        return lastSlash >= 0 ? normalized.substring(lastSlash + 1) : normalized;
    }

    private boolean hasExtension(String value, String extension) {
        return value != null && value.toLowerCase(Locale.ROOT).endsWith(extension);
    }
}
