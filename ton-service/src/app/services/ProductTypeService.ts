import {ProductType} from '../shared/ProductType';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ProductTypeService {

  constructor(private http: HttpClient) {
  }

  public getTopServiceHierarchy(): Observable<ProductType[]> {
    // const signboards = new ProductType('Вывески', [], '');
    // const light = new ProductType('Световые короба', [], '');
    // const panel = new ProductType('Панель-кронштейны', [], '');
    // const baners = new ProductType('Рекламные банеры', [], '');
    // const vitrins = new ProductType('Оформление витрин', [] , '');
    // const shtenders = new ProductType('Отдельно стоящие рекламоносители (штендеры, стеллы)', [] , '');
    // const aboveTheRoof = new ProductType('Надкрышные конструкции', [], '');
    // const passport = new ProductType('Согласование наружной рекламы (паспортизация)', [], '');
    // const exterierAds = new ProductType('Наружная реклама', [signboards, light, panel, baners, vitrins, shtenders, aboveTheRoof, passport], '');
    // const tables = new ProductType('Таблички, навигация, указатели', [], '');
    // const signs = new ProductType('Знаки безопасности', [], '');
    // const anshlag = new ProductType('Табличка на дом (аншлаг)', [], '');
    // const stends = new ProductType('Стенды, системы карманов', [], '');
    // const schools = new ProductType('Школы, детские сады', [], '');
    // const interierSignboards = new ProductType('Интерьерные вывески', [], '');
    // const interierAds = new ProductType('Интерьерная реклама', [tables, signs, anshlag, stends, schools, interierSignboards], '');
    // const autoWallpapering = new ProductType('Оклейка авто, мотоциклов, катеров и другого транспорта', [], '');
    // const auto = new ProductType('Автотранспорт', [autoWallpapering], '');
    // const skinali = new ProductType('Стеновые панели из стекла (скинали)', [], '');
    // const safetyGlassTinting = new ProductType('Защитные и противоударные пленки класса А1, А2, А3', [], '');
    // const glassAndMirrorTinting = new ProductType('Тонировка окон, стекол', [], '');
    // const tinting = new ProductType('Тонировка окон, стекол', [skinali, safetyGlassTinting, glassAndMirrorTinting], '');
    // const wideformatPrint = new ProductType('Широкоформатная печать', [], '');
    // const photoWallpaper = new ProductType('Фотообои', [], '');
    // return [exterierAds, interierAds, auto, tinting, wideformatPrint, photoWallpaper];
    // @ts-ignore
    return this.http.get<ProductType[]>('/api/product-types');
  }
}
