package by.site.tonservice.sd1.controller;

import by.site.tonservice.sd1.service.DbInitializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequestMapping("db")
public class DbInitializerController {

    private DbInitializer dbInitializer;

//    @RequestMapping(value = "", method = RequestMethod.GET)
    public void init() {
        dbInitializer.initProductExamples();
    }

    @Autowired
    public void setDbInitializer(DbInitializer dbInitializer) {
        this.dbInitializer = dbInitializer;
    }
}
