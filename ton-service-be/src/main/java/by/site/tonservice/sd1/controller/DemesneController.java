package by.site.tonservice.sd1.controller;

import by.site.tonservice.sd1.entity.Demesne;
import by.site.tonservice.sd1.service.DemesneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/demesne")
public class DemesneController {

    private DemesneService demesneService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Demesne> getAll() {
        return demesneService.getAll();
    }

    @Autowired
    public void setDemesneService(DemesneService demesneService) {
        this.demesneService = demesneService;
    }
}
