package by.site.tonservice.sd1.service;

import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.IOException;

public interface ContactUsService {

    void contactUs(String name, String email, String content, MultipartFile multipartFile) throws MessagingException, IOException;
}
