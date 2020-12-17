package by.site.tonservice.sd1;

import by.site.tonservice.sd1.service.DbInitializer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class TonServiceBeApplication {
    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(TonServiceBeApplication.class, args);
//        context.getBean(DbInitializer.class).initProductExamples();
    }
}
