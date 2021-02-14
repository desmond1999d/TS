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