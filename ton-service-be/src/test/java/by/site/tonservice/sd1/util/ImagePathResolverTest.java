package by.site.tonservice.sd1.util;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigInteger;
import java.nio.file.Paths;

import static by.site.tonservice.sd1.service.impl.DbInitializerImpl.FILE_BASE_DIR;
import static org.assertj.core.api.Assertions.assertThat;

class ImagePathResolverTest {

    private ImagePathResolver imagePathResolver;

    @BeforeEach
    void setUp() {
        imagePathResolver = new ImagePathResolver();
    }

    @Test
    void resolvesUrlStylePath() {
        assertThat(imagePathResolver.resolveSourceFilePath("/Examples/30/photo.jpg"))
                .isEqualTo(Paths.get(FILE_BASE_DIR, "30", "photo.jpg").normalize());
    }

    @Test
    void resolvesRelativePath() {
        assertThat(imagePathResolver.resolveSourceFilePath("../Examples/30/photo.jpg"))
                .isEqualTo(Paths.get(FILE_BASE_DIR, "30", "photo.jpg").normalize());
    }

    @Test
    void resolvesFullFilesystemPath() {
        assertThat(imagePathResolver.resolveSourceFilePath("../../var/www/html/Examples/30/photo.jpg"))
                .isEqualTo(Paths.get(FILE_BASE_DIR, "30", "photo.jpg").normalize());
    }

    @Test
    void buildsNormalizedWebpUrl() {
        assertThat(imagePathResolver.toWebpUrlPath(BigInteger.valueOf(30), "/Examples/30/photo.jpg"))
                .isEqualTo("/Examples/30/photo.webp");
    }

    @Test
    void buildsTargetFilePath() {
        assertThat(imagePathResolver.resolveTargetFilePath(BigInteger.valueOf(30), "../Examples/30/photo.png"))
                .isEqualTo(Paths.get(FILE_BASE_DIR, "30", "photo.webp").normalize());
    }

    @Test
    void detectsConvertibleExtensions() {
        assertThat(imagePathResolver.isConvertibleExtension("/Examples/30/photo.JPG")).isTrue();
        assertThat(imagePathResolver.isConvertibleExtension("/Examples/30/photo.jpeg")).isTrue();
        assertThat(imagePathResolver.isConvertibleExtension("/Examples/30/photo.png")).isTrue();
        assertThat(imagePathResolver.isConvertibleExtension("/Examples/30/photo.gif")).isFalse();
        assertThat(imagePathResolver.isConvertibleExtension("/Examples/30/photo.webp")).isFalse();
    }

    @Test
    void detectsWebp() {
        assertThat(imagePathResolver.isWebp("/Examples/30/photo.webp")).isTrue();
        assertThat(imagePathResolver.isWebp("/Examples/30/photo.jpg")).isFalse();
    }
}
