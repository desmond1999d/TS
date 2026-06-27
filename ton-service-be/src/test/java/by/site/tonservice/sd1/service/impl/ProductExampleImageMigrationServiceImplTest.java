package by.site.tonservice.sd1.service.impl;

import by.site.tonservice.sd1.dto.ImageMigrationReport;
import by.site.tonservice.sd1.entity.ProductExample;
import by.site.tonservice.sd1.repository.ProductExampleRepository;
import by.site.tonservice.sd1.util.ImagePathResolver;
import by.site.tonservice.sd1.util.WebpImageConverter;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.math.BigInteger;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class ProductExampleImageMigrationServiceImplTest {

    private Path tempDir;
    private String previousUserDir;
    private ProductExampleRepository productExampleRepository;
    private ProductExampleImageMigrationServiceImpl migrationService;

    @BeforeEach
    void setUp() throws Exception {
        tempDir = Files.createTempDirectory("webp-migration-test");
        previousUserDir = System.getProperty("user.dir");
        productExampleRepository = mock(ProductExampleRepository.class);
        migrationService = new ProductExampleImageMigrationServiceImpl();
        migrationService.setProductExampleRepository(productExampleRepository);
        migrationService.setImagePathResolver(new ImagePathResolver());
        migrationService.setWebpImageConverter(new WebpImageConverter(0.85f));
    }

    @AfterEach
    void tearDown() throws Exception {
        System.setProperty("user.dir", previousUserDir);
        if (tempDir != null) {
            deleteRecursively(tempDir);
        }
    }

    @Test
    void dryRunDoesNotWriteFilesOrUpdateDatabase() throws Exception {
        Path fileBaseDir = prepareExamplesLayout();
        Path sourceImage = fileBaseDir.resolve("30").resolve("photo.jpg");
        writeJpeg(sourceImage);

        ProductExample example = example(BigInteger.ONE, BigInteger.valueOf(30), "/Examples/30/photo.jpg");
        when(productExampleRepository.findAllWithConvertibleImageSource())
                .thenReturn(Collections.singletonList(example));

        ImageMigrationReport report = migrationService.migrateToWebp(true);

        assertThat(report.getWouldConvert()).isEqualTo(1);
        assertThat(Files.exists(fileBaseDir.resolve("30").resolve("photo.webp"))).isFalse();
        verify(productExampleRepository, never()).save(example);
    }

    @Test
    void liveRunConvertsFileAndUpdatesDatabase() throws Exception {
        Path fileBaseDir = prepareExamplesLayout();
        Path sourceImage = fileBaseDir.resolve("30").resolve("photo.jpg");
        writeJpeg(sourceImage);

        ProductExample example = example(BigInteger.ONE, BigInteger.valueOf(30), "/Examples/30/photo.jpg");
        when(productExampleRepository.findAllWithConvertibleImageSource())
                .thenReturn(Collections.singletonList(example));

        ImageMigrationReport report = migrationService.migrateToWebp(false);

        assertThat(report.getConverted()).isEqualTo(1);
        assertThat(Files.exists(fileBaseDir.resolve("30").resolve("photo.webp"))).isTrue();
        assertThat(Files.exists(sourceImage)).isTrue();
        assertThat(example.getImgSource()).isEqualTo("/Examples/30/photo.webp");
        verify(productExampleRepository).save(example);
    }

    private Path prepareExamplesLayout() throws Exception {
        Path fileBaseDir = tempDir.resolve("var").resolve("www").resolve("html").resolve("Examples");
        Files.createDirectories(fileBaseDir.resolve("30"));
        Path workingDir = fileBaseDir.resolve("../../../ops/be").normalize();
        Files.createDirectories(workingDir);
        System.setProperty("user.dir", workingDir.toString());
        assertThat(Paths.get("../../var/www/html/Examples").normalize()).isEqualTo(fileBaseDir);
        return fileBaseDir;
    }

    private ProductExample example(BigInteger id, BigInteger productTypeId, String imgSource) {
        ProductExample example = new ProductExample(productTypeId, imgSource, 0);
        example.setId(id);
        return example;
    }

    private void writeJpeg(Path path) throws Exception {
        BufferedImage image = new BufferedImage(4, 4, BufferedImage.TYPE_INT_RGB);
        ImageIO.write(image, "jpg", path.toFile());
    }

    private void deleteRecursively(Path path) throws Exception {
        if (!Files.exists(path)) {
            return;
        }
        Files.walk(path)
                .sorted((a, b) -> b.compareTo(a))
                .forEach(p -> {
                    try {
                        Files.deleteIfExists(p);
                    } catch (Exception ignored) {
                    }
                });
    }
}
