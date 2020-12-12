package by.site.tonservice.sd1.controller;

import by.site.tonservice.sd1.service.ContactUsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.IOException;

@RestController
@RequestMapping("api/contact-us")
public class ContactUsController {

    private ContactUsService contactUsService;

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity getAll(@RequestParam(value = "file", required = false) MultipartFile file,
                                 @RequestParam("name") String name,
                                 @RequestParam("email") String email,
                                 @RequestParam("content") String content) {
        try {
            contactUsService.contactUs(name, email, content, file);
        } catch (MessagingException | IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok().build();
    }

    @Autowired
    public void setContactUsService(ContactUsService contactUsService) {
        this.contactUsService = contactUsService;
    }
}
