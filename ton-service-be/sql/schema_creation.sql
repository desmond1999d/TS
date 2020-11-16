CREATE TABLE `ton-service`.`product_types` (
  `PRODUCT_TYPE_ID` INT NOT NULL,
  `PARENT_ID` INT NULL,
  `NAME` VARCHAR(100) NULL,
  `DESCRIPTION` VARCHAR(200) NULL,
  PRIMARY KEY (`PRODUCT_TYPE_ID`),
  UNIQUE INDEX `PRODUCT_TYPE_ID_UNIQUE` (`PRODUCT_TYPE_ID` ASC) VISIBLE);

CREATE TABLE `ton-service`.`product_type_examples` (
  `PRODUCT_TYPE_EXAMPLE_ID` INT NOT NULL,
  `PRODUCT_TYPE_ID` INT NULL,
  `IMG_SOURCE` VARCHAR(200) NULL,
  `COMPANY_NAME` VARCHAR(45) NULL,
  `ORDER` INT NULL,
  PRIMARY KEY (`PRODUCT_TYPE_EXAMPLE_ID`),
  UNIQUE INDEX `PRODUCT_TYPE_EXAMPLE_ID_UNIQUE` (`PRODUCT_TYPE_EXAMPLE_ID` ASC) VISIBLE,
  INDEX `PRODUCT_TYPE_ID_idx` (`PRODUCT_TYPE_ID` ASC) VISIBLE,
  CONSTRAINT `PRODUCT_TYPE_ID`
    FOREIGN KEY (`PRODUCT_TYPE_ID`)
    REFERENCES `ton-service`.`product_types` (`PRODUCT_TYPE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `ton-service`.`prices` (
  `PRICE_ID` INT NOT NULL,
  `PRODUCT_TYPE_ID` INT NOT NULL,
  `VALUE` DECIMAL NOT NULL,
  `UNIT` VARCHAR(20) NOT NULL,
  UNIQUE INDEX `PRICE_ID_UNIQUE` (`PRICE_ID` ASC) VISIBLE,
  PRIMARY KEY (`PRICE_ID`),
  INDEX `PRODUCT_TYPE_ID_idx` (`PRODUCT_TYPE_ID` ASC) VISIBLE,
  CONSTRAINT `PRICE_PRODUCT_TYPE_ID`
    FOREIGN KEY (`PRODUCT_TYPE_ID`)
    REFERENCES `ton-service`.`product_types` (`PRODUCT_TYPE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
