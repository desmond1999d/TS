package by.site.tonservice.sd1.service.impl;

import by.site.tonservice.sd1.entity.Demesne;
import by.site.tonservice.sd1.repository.DemesneRepository;
import by.site.tonservice.sd1.service.DemesneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DemesneServiceImpl implements DemesneService {

    private DemesneRepository demesneRepository;

    @Override
    public List<Demesne> getAll() {
        List<Demesne> demesnes = new ArrayList<>();
        demesneRepository.findAll().forEach(demesnes::add);
        return demesnes;
    }

    @Autowired
    public void setDemesneRepository(DemesneRepository demesneRepository) {
        this.demesneRepository = demesneRepository;
    }
}
