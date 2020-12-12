package by.site.tonservice.sd1.service.impl;

import by.site.tonservice.sd1.service.ContactUsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.io.IOException;

@Service
public class ContactUsServiceImpl implements ContactUsService {

    private JavaMailSender emailSender;

    private static final String EMAIL_FROM = "desmond1999d@mail.ru";
    private static final String EMAIL_TO = "desmond1999d@mail.ru";
    private static final String EMAIL_SUBJECT = "Новый заказ от ";

    @Value("${app.upload.dir:${user.home}}")
    public String uploadDir;

    @Override
    public void contactUs(String name, String email, String content, MultipartFile multipartFile) throws MessagingException, IOException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = null;
        helper = new MimeMessageHelper(message, true);
        helper.setFrom(EMAIL_FROM);
        helper.setTo(EMAIL_TO);
        helper.setSubject(EMAIL_SUBJECT + name);
        helper.setText(content + "\n\nАдрес отправителя: " + email);
        if (multipartFile != null) {
            File file = new File(uploadDir + File.separator + "TS" + File.separator +
                    StringUtils.cleanPath(multipartFile.getOriginalFilename()));
            if (!file.exists()) {
                if (file.createNewFile()) {
                    multipartFile.transferTo(file);
                }
            } else {
                multipartFile.transferTo(file);
            }
            helper.addAttachment(file.getName(), file);
        }
        emailSender.send(message);
    }

    @Autowired
    public void setEmailSender(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }
}
