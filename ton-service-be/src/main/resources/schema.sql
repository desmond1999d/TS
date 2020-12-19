CREATE TABLE IF NOT EXISTS `ton_service`.`product_types` (
  `PRODUCT_TYPE_ID` INT(11) NOT NULL,
  `PARENT_ID` INT(11) NULL DEFAULT NULL,
  `NAME` VARCHAR(100) NULL DEFAULT NULL,
  `DESCRIPTION` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`PRODUCT_TYPE_ID`),
  UNIQUE INDEX `PRODUCT_TYPE_ID_UNIQUE` (`PRODUCT_TYPE_ID` ASC) VISIBLE,
  INDEX `PARENT_ID_idx` (`PARENT_ID` ASC) VISIBLE,
  CONSTRAINT `PARENT_ID`
    FOREIGN KEY (`PARENT_ID`)
    REFERENCES `ton_service`.`product_types` (`PRODUCT_TYPE_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `ton_service`.`prices` (
  `PRICE_ID` INT(11) NOT NULL,
  `PRODUCT_TYPE_ID` INT(11) NOT NULL,
  `VALUE` DECIMAL(10,0) NOT NULL,
  `UNIT` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`PRICE_ID`),
  UNIQUE INDEX `PRICE_ID_UNIQUE` (`PRICE_ID` ASC) VISIBLE,
  INDEX `PRODUCT_TYPE_ID_idx` (`PRODUCT_TYPE_ID` ASC) VISIBLE,
  CONSTRAINT `PRICE_PRODUCT_TYPE_ID`
    FOREIGN KEY (`PRODUCT_TYPE_ID`)
    REFERENCES `ton_service`.`product_types` (`PRODUCT_TYPE_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `ton_service`.`product_type_examples` (
  `PRODUCT_TYPE_EXAMPLE_ID` INT(11) NOT NULL AUTO_INCREMENT,
  `PRODUCT_TYPE_ID` INT(11) NULL DEFAULT NULL,
  `IMG_SOURCE` VARCHAR(200) NULL DEFAULT NULL,
  `COMPANY_NAME` VARCHAR(45) NULL DEFAULT NULL,
  `DISPLAY_ORDER` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`PRODUCT_TYPE_EXAMPLE_ID`),
  UNIQUE INDEX `PRODUCT_TYPE_EXAMPLE_ID_UNIQUE` (`PRODUCT_TYPE_EXAMPLE_ID` ASC) VISIBLE,
  INDEX `PRODUCT_TYPE_ID_idx` (`PRODUCT_TYPE_ID` ASC) VISIBLE,
  CONSTRAINT `PRODUCT_TYPE_ID`
    FOREIGN KEY (`PRODUCT_TYPE_ID`)
    REFERENCES `ton_service`.`product_types` (`PRODUCT_TYPE_ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 1254
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;