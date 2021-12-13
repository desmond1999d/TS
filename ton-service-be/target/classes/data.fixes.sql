ALTER TABLE `ton_service`.`product_types` ADD COLUMN `thumbnail` VARCHAR(200) NULL DEFAULT NULL AFTER `DESCRIPTION`;

update product_types set thumbnail = '../Examples/15/Beauty-Code.jpg' where product_type_id = 16;
update product_types set thumbnail = '../Examples/17/Bugrialt..gif' where product_type_id = 18;
update product_types set thumbnail = '../Examples/19/Butik-krasoti.jpg' where product_type_id = 22;
update product_types set thumbnail = '../Examples/23/Studia-otdiha.gif' where product_type_id = 23;
update product_types set thumbnail = '../Examples/24/BUGATTI.jpg' where product_type_id = 24;
update product_types set thumbnail = '../Examples/25/Ohrana.jpg' where product_type_id = 25;
update product_types set thumbnail = '../Examples/1/continent-night.jpg' where product_type_id = 9;

update product_type_examples set product_type_id = 26 where product_type_id = 24;
update product_type_examples set product_type_id = 27 where product_type_id = 25;
update product_type_examples set product_type_id = 28 where product_type_id = 23;

update product_types set parent_id = 23 where product_type_id = 28;
update product_types set parent_id = 25 where product_type_id = 27;
update product_types set parent_id = 24 where product_type_id = 26;

CREATE TABLE `demesne` (
  `demesne_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`demesne_id`),
  UNIQUE KEY `demesne_id_UNIQUE` (`demesne_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `ton_service`.`product_types`
ADD COLUMN `demesne_id` INT(11) NULL DEFAULT NULL AFTER `thumbnail`,
ADD COLUMN `hide_in_tree` BIT NULL DEFAULT 0 AFTER `demesne_id`,
ADD INDEX `DEMESNE_ID_idx` (`demesne_id` ASC) VISIBLE;
;

ALTER TABLE `ton_service`.`product_types`
ADD CONSTRAINT `DEMESNE_ID`
  FOREIGN KEY (`demesne_id`)
  REFERENCES `ton_service`.`demesne` (`demesne_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

set foreign_key_checks=0;
ALTER TABLE `ton_service`.`product_types`
CHANGE COLUMN `PRODUCT_TYPE_ID` `PRODUCT_TYPE_ID` INT(11) NOT NULL AUTO_INCREMENT ;
set foreign_key_checks=1;

INSERT INTO `demesne` VALUES (1,'Реклама'),(2,'Антикоррозийная обработка автомобилей'),(3,'Тонировка');

INSERT INTO `demesne` VALUES (1,'Реклама'),(2,'Антикоррозийная обработка автомобилей'),(3,'Тонировка');
INSERT INTO `product_types` VALUES (20,NULL,'Наружная реклама',NULL,NULL,1,_binary '\0'),(21,NULL,'Интерьерная реклама',NULL,NULL,1,_binary '\0'),(22,NULL,'Широкоформатная печать',NULL,NULL,1,_binary '\0'),(23,NULL,'Реклама на транспорте',NULL,NULL,1,_binary '\0'),(24,NULL,'Согласование рекламы',NULL,NULL,1,_binary '\0'),(25,NULL,'Скинали',NULL,NULL,1,_binary '\0'),(26,NULL,'Прочее',NULL,NULL,1,_binary '\0'),(27,NULL,'Защита от коррозии Dinitrol, Mercasol, Noxudol',NULL,NULL,2,_binary '\0'),(28,NULL,'Тонировка окон, стёкол',NULL,NULL,3,_binary '\0'),(29,NULL,'Защитные и противоударные пленки класса A1, A2, A3',NULL,NULL,3,_binary '\0'),(30,20,'Вывески',NULL,NULL,NULL,_binary '\0'),(31,20,'Световые короба, лайтбоксы',NULL,NULL,NULL,_binary '\0'),(32,20,'Бегущая строка электронные табло',NULL,NULL,NULL,_binary '\0'),(33,20,'Кронштейны',NULL,NULL,NULL,_binary '\0'),(34,20,'Оформление витрин',NULL,NULL,NULL,_binary '\0'),(35,20,'Штендеры, стеллы',NULL,NULL,NULL,_binary '\0'),(36,20,'Крышные конструкции',NULL,NULL,NULL,_binary '\0'),(37,20,'Адресные таблички (Аншлаги)',NULL,NULL,NULL,_binary '\0'),(38,21,'Интерьерные вывески',NULL,NULL,NULL,_binary '\0'),(39,21,'Таблички, указатели, навигация',NULL,NULL,NULL,_binary '\0'),(40,21,'Знаки безопасности',NULL,NULL,NULL,_binary '\0'),(41,21,'Стенды, системы карманов',NULL,NULL,NULL,_binary '\0'),(42,21,'Оформление школ и садиков',NULL,NULL,NULL,_binary '\0'),(43,21,'Музеи',NULL,NULL,NULL,_binary '\0'),(44,22,'Баннеры',NULL,NULL,NULL,_binary '\0'),(45,22,'Наклейки',NULL,NULL,NULL,_binary '\0'),(46,22,'Плакаты',NULL,NULL,NULL,_binary '\0'),(47,22,'Фотообои',NULL,NULL,NULL,_binary '\0'),(48,22,'Печать на ткани',NULL,NULL,NULL,_binary '\0'),(49,23,'Реклама на автомобиле',NULL,NULL,NULL,_binary '\0'),(50,23,'Оклейка такси',NULL,NULL,NULL,_binary '\0'),(51,23,'Оклейка спецтранспорта (МВД, МЧС)',NULL,NULL,NULL,_binary '\0'),(52,23,'Наклейки на мотоциклы',NULL,NULL,NULL,_binary '\0'),(53,23,'Наклейки для катеров, гидроскутеров и др.',NULL,NULL,NULL,_binary '\0'),(54,24,'Паспортизация рекламы',NULL,NULL,NULL,_binary '\0'),(55,25,'Стеновые панели из стекла',NULL,NULL,NULL,_binary '\0'),(56,26,'Средства защиты от COVID',NULL,NULL,NULL,_binary '\0'),(57,27,'Защита от коррозии Dinitrol, Mercasol, Noxudol',NULL,NULL,NULL,_binary '\0'),(58,28,'Тонировка окон, стёкол',NULL,NULL,NULL,_binary '\0'),(59,29,'Защитные и противоударные пленки класса A1, A2, A3',NULL,NULL,NULL,_binary '\0');

update product_types set name = 'Согласование рекламы (Паспортизация)' where product_type_id = 24;
update product_types set hide_in_tree = 1 where product_type_id = 54;

update product_types set name = 'Скинали (Стеновые панели из стекла)' where product_type_id = 25;
update product_types set hide_in_tree = 1 where product_type_id = 55;

delete from product_types where product_type_id = 56;
delete from product_types where product_type_id = 26;

insert into product_types(name, demesne_id) values('Дизайн', 1);
insert into product_types(name, hide_in_tree, demesne_id) values('Тонировка офисных перегородок, лоджий и др.', 1, 3);

insert into product_types(name, parent_id, hide_in_tree) values('Дизайн', 60, 1);
insert into product_types(name, parent_id, hide_in_tree) values('Тонировка офисных перегородок, лоджий и др.', 61, 1);

update product_types set NAME = 'Бегущая строка (Электронные табло)' where PRODUCT_TYPE_ID = 32;
update product_types set NAME = 'Оформление школ, садиков, вузов' where PRODUCT_TYPE_ID = 42;
update product_types set NAME = 'Наклейки на мотоциклы, квадроциклы, скутеры' where PRODUCT_TYPE_ID = 52;
delete from product_types where PRODUCT_TYPE_ID = 53;
update product_types set NAME = 'Дизайн рекламы' where PRODUCT_TYPE_ID = 60;
update product_types set NAME = 'Дизайн рекламы' where PRODUCT_TYPE_ID = 62;

update product_types set NAME = 'Антикоррозийная обработка Dinitrol, Mercasol, Noxudol' where PRODUCT_TYPE_ID = 27;
update product_types set NAME = 'Антикоррозийная обработка Dinitrol, Mercasol, Noxudol' where PRODUCT_TYPE_ID = 57;

update product_types set NAME = 'Тонировка стёкол' where PRODUCT_TYPE_ID = 28;
update product_types set NAME = 'Тонировка стёкол' where PRODUCT_TYPE_ID = 58;

update product_types set NAME = 'Защитные пленки A1, A2, A3' where PRODUCT_TYPE_ID = 29;
update product_types set NAME = 'Защитные пленки A1, A2, A3' where PRODUCT_TYPE_ID = 59;

-- not executed

update product_types set name = 'Тонировка стёкол. Защитные пленки А1, А2, А3' where product_type_id = 28;
update product_types set name = 'Тонировка стёкол. Защитные пленки А1, А2, А3' where product_type_id = 58;

delete from product_types where product_type_id = 59;
delete from product_types where product_type_id = 29;

ALTER TABLE `ton_service`.`product_types`
ADD COLUMN `display_order` INT(11) NOT NULL DEFAULT 0 AFTER `hide_in_tree`;

update product_types set display_order = 1 where product_type_id = 20;
update product_types set display_order = 2 where product_type_id = 21;
update product_types set display_order = 3 where product_type_id = 23;
update product_types set display_order = 4 where product_type_id = 22;
update product_types set display_order = 6 where product_type_id = 24;
update product_types set display_order = 5 where product_type_id = 25;
update product_types set display_order = 7 where product_type_id = 60;

update product_types set display_order = 8 where product_type_id = 27;
update product_types set display_order = 9 where product_type_id = 28;
update product_types set display_order = 10 where product_type_id = 61;

update product_types set display_order = 1 where product_type_id = 30;
update product_types set display_order = 2 where product_type_id = 31;
update product_types set display_order = 3 where product_type_id = 32;
update product_types set display_order = 4 where product_type_id = 33;
update product_types set display_order = 5 where product_type_id = 34;
update product_types set display_order = 6 where product_type_id = 35;
update product_types set display_order = 7 where product_type_id = 36;
update product_types set display_order = 8 where product_type_id = 37;

update product_types set display_order = 1 where product_type_id = 38;
update product_types set display_order = 3 where product_type_id = 39;
update product_types set display_order = 4 where product_type_id = 40;
update product_types set display_order = 2 where product_type_id = 41;
update product_types set display_order = 5 where product_type_id = 42;
update product_types set display_order = 6 where product_type_id = 43;

update product_types set display_order = 1 where product_type_id = 44;
update product_types set display_order = 2 where product_type_id = 45;
update product_types set display_order = 3 where product_type_id = 46;
update product_types set display_order = 4 where product_type_id = 47;
update product_types set display_order = 5 where product_type_id = 48;

update product_types set display_order = 1 where product_type_id = 49;
update product_types set display_order = 2 where product_type_id = 50;
update product_types set display_order = 3 where product_type_id = 51;
update product_types set display_order = 4 where product_type_id = 52;

update product_types set thumbnail = '../Examples/Thumbnails/roof.jpg' where product_type_id = 20;
update product_types set thumbnail = '../Examples/Thumbnails/interior.jpg' where product_type_id = 21;
update product_types set thumbnail = '../Examples/Thumbnails/car.jpg' where product_type_id = 23;
update product_types set thumbnail = '../Examples/Thumbnails/wide.jpg' where product_type_id = 22;
update product_types set thumbnail = '../Examples/Thumbnails/tales.jpg' where product_type_id = 25;
update product_types set thumbnail = '../Examples/Thumbnails/pasportization.jpg' where product_type_id = 24;
update product_types set thumbnail = '../Examples/Thumbnails/anticor.jpg' where product_type_id = 27;
update product_types set thumbnail = '../Examples/Thumbnails/ton.jpg' where product_type_id = 28;
update product_types set thumbnail = '../Examples/Thumbnails/design.jpg' where product_type_id = 60;

ALTER TABLE `ton_service`.`product_types`
CHANGE COLUMN `DESCRIPTION` `DESCRIPTION` VARCHAR(400) NULL DEFAULT NULL ;

UPDATE product_types SET DESCRIPTION = 'Наружная реклама формирует образ вашей компании-продавца и приносит вам прибыль. Мы изготовим любую рекламу для наружного размещения, будь то нестандартный световой короб, большие дизайнерские буквы или отдельно стоящие конструкции.' WHERE PRODUCT_TYPE_ID = 20;
UPDATE product_types SET DESCRIPTION = 'Предлагаем интерьерные вывески с уникальным дизайном и качественным исполнением, световые и не световые объемные буквы, таблички-ориентиры, уголки клиента. Рекламное оформление ресепшн, зон продаж и отдыха. Всё, чтобы завоевать внимание Ваших  покупателей!' WHERE PRODUCT_TYPE_ID = 21;
UPDATE product_types SET DESCRIPTION = 'Мы печатаем на: баннере, пленке, сетке, перфорированной пленке, бумаге, ткани, фотообоях, backlight. Для защиты изображения используем широкоформатное ламинирование.' WHERE PRODUCT_TYPE_ID = 22;
UPDATE product_types SET DESCRIPTION = 'Мы профессионально оклеиваем автомобили рекламой. Мы знаем, как сделать рекламное изображение долговечным и создающим дополнительную защиту кузова. Брендированный автомобиль становится мобильным рекламным носителем корпоративных интересов!' WHERE PRODUCT_TYPE_ID = 23;
UPDATE product_types SET DESCRIPTION = 'Дизайн, в нашей работе, это увлекательный творческий процесс, который приводит к созданию концептуально оригинального проекта рекламы на основе брифа заказчика и точно в срок.' WHERE PRODUCT_TYPE_ID = 24;
UPDATE product_types SET DESCRIPTION = 'Скинали — это стеклянная поверхность с нанесенной фотопечатью. Этот вид декоративной отделки «фартука» на кухне и шкафов-купе. Это настенные фотопанно, создающие современный и неповторимый интерьер, Преимущества экологичного материала и простота ухода!' WHERE PRODUCT_TYPE_ID = 25;
UPDATE product_types SET DESCRIPTION = 'Мы располагаем 20-летним опытом антикоррозийной обработки автомобилей. Для защиты от коррозии, мы используем только качественные материалы: Dinitrol, Mercasol, Noxudol. Бесплатное ежегодное обслуживание!' WHERE PRODUCT_TYPE_ID = 27;
UPDATE product_types SET DESCRIPTION = 'Тонировка стёкол служит защитой от солнца, украшает фасады, сохраняет приватность. Разнообразие оттенков зеркальных плёнок с односторонней видимостью и матовых пленок. Защитные плёнки класса А1, А2, А3 обезопасят Вас в случае разбитого стекла.' WHERE PRODUCT_TYPE_ID = 28;
UPDATE product_types SET DESCRIPTION = 'Зная, насколько важно для Вас получить полный комплекс услуг, специалисты Тон-сервис помогут оценить необходимость паспортизации рекламы и правильно оформить весь пакет документов на согласование наружной рекламы, в случаях, предусмотренных законодательством РБ' WHERE PRODUCT_TYPE_ID = 60;

ALTER TABLE `ton_service`.`product_types`
ADD COLUMN `type_description` MEDIUMTEXT NULL AFTER `display_order`;
