package by.site.tonservice.sd1.dto;

import org.springframework.web.multipart.MultipartFile;

public class ContactUsData {

    private String name;
    private String email;
    private String content;
    private MultipartFile file;

    public ContactUsData(String name, String email, String content, MultipartFile file) {
        this.name = name;
        this.email = email;
        this.content = content;
        this.file = file;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
