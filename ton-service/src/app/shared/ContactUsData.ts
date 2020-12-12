export class ContactUsData {
  name: string;
  email: string;
  content: string;
  file: File;

  constructor(name: string, email: string, content: string, file: File) {
    this.name = name;
    this.email = email;
    this.content = content;
    this.file = file;
  }
}
