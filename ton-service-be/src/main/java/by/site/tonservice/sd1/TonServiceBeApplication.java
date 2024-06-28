package by.site.tonservice.sd1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class TonServiceBeApplication {
    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(TonServiceBeApplication.class, args);
//        context.getBean(DbInitializer.class).initProductExamples();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry
                        .addMapping("/**")
                        .allowedOrigins("*")
//                        .allowedOrigins("http://165.22.16.238", "http://ton-service.by", "http://www.ton-service.by"
//                        , "http://10.230.68.58", "http://localhost")
                        .allowedMethods("*")
                        .allowCredentials(true)
                        .allowedHeaders("*");
            }
        };
    }
}
