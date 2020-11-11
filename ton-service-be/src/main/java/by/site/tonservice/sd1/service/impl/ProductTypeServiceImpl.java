package by.site.tonservice.sd1.service.impl;

import by.site.tonservice.sd1.entity.ProductType;
import by.site.tonservice.sd1.service.ProductTypeService;
import org.assertj.core.util.Lists;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductTypeServiceImpl implements ProductTypeService {

    public List<ProductType> getAllProductTypes() {
        ProductType signboards = new ProductType("Вывески", Lists.<ProductType>emptyList(), "");
        ProductType light = new ProductType("Световые короба", Lists.<ProductType>emptyList(), "");
        ProductType panel = new ProductType("Панель-кронштейны", Lists.<ProductType>emptyList(), "");
        ProductType baners = new ProductType("Рекламные банеры", Lists.<ProductType>emptyList(), "");
        ProductType vitrins = new ProductType("Оформление витрин", Lists.<ProductType>emptyList(), "");
        ProductType shtenders = new ProductType("Отдельно стоящие рекламоносители (штендеры, стеллы)", Lists.<ProductType>emptyList(), "");
        ProductType aboveTheRoof = new ProductType("Надкрышные конструкции", Lists.<ProductType>emptyList(), "");
        ProductType passport = new ProductType("Согласование наружной рекламы (паспортизация)", Lists.<ProductType>emptyList(), "");
        ProductType exterierAds = new ProductType("Наружная реклама", Lists.list(signboards, light, panel, baners, vitrins, shtenders, aboveTheRoof, passport),
                "");
        ProductType tables = new ProductType("Таблички, навигация, указатели", Lists.<ProductType>emptyList(), "");
        ProductType signs = new ProductType("Знаки безопасности", Lists.<ProductType>emptyList(), "");
        ProductType anshlag = new ProductType("Табличка на дом (аншлаг)", Lists.<ProductType>emptyList(), "");
        ProductType stends = new ProductType("Стенды, системы карманов", Lists.<ProductType>emptyList(), "");
        ProductType schools = new ProductType("Школы, детские сады", Lists.<ProductType>emptyList(), "");
        ProductType interierSignboards = new ProductType("Интерьерные вывески", Lists.<ProductType>emptyList(), "");
        ProductType interierAds = new ProductType("Интерьерная реклама", Lists.list(tables, signs, anshlag, stends, schools, interierSignboards),
                "");
        ProductType autoWallpapering = new ProductType("Оклейка авто, мотоциклов, катеров и другого транспорта", Lists.<ProductType>emptyList(), "");
        ProductType auto = new ProductType("Автотранспорт", Lists.list(autoWallpapering), "");
        ProductType skinali = new ProductType("Стеновые панели из стекла (скинали)", Lists.<ProductType>emptyList(), "");
        ProductType safetyGlassTinting = new ProductType("Защитные и противоударные пленки класса А1, А2, А3", Lists.<ProductType>emptyList(), "");
        ProductType glassAndMirrorTinting = new ProductType("Тонировка окон, стекол", Lists.<ProductType>emptyList(), "");
        ProductType tinting = new ProductType("Тонировка окон, стекол", Lists.list(skinali, safetyGlassTinting, glassAndMirrorTinting),
                "");
        ProductType wideformatPrint = new ProductType("Широкоформатная печать", Lists.<ProductType>emptyList(), "");
        ProductType photoWallpaper = new ProductType("Фотообои", Lists.<ProductType>emptyList(), "");
        return Lists.list(exterierAds, interierAds, auto, tinting, wideformatPrint, photoWallpaper);
    }
}
