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