-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema FabricationShop
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema FabricationShop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fabrication_shop` DEFAULT CHARACTER SET utf8 ;
USE `fabrication_shop` ;

-- -----------------------------------------------------
-- Table `FabricationShop`.`Student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fabrication_shop`.`student` (
  `student_pk` INT NOT NULL AUTO_INCREMENT,
  `student_id` VARCHAR(11) NOT NULL,
  `net_id` VARCHAR(9) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `training_level` TINYINT UNSIGNED NULL DEFAULT 0,
  PRIMARY KEY (`student_pk`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FabricationShop`.`Machine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fabrication_shop`.`machine` (
  `machine_pk` INT NOT NULL AUTO_INCREMENT,
  `machine_tag` VARCHAR(20) NOT NULL,
  `machine_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`machine_pK`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FabricationShop`.`UseRecord`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fabrication_shop`.`use_record` (
  `use_record_pk` INT NOT NULL AUTO_INCREMENT,
  `student_student_pk` INT NOT NULL,
  `machine_machine_pk` INT NOT NULL,
  `date_of_sign_in` DATETIME NOT NULL,
  `date_of_sign_out` DATETIME NULL,
  `session_length` TIME GENERATED ALWAYS AS (date_of_sign_out - date_of_sign_in) VIRTUAL,
  PRIMARY KEY (`use_record_pk`, `student_student_pk`, `machine_machine_pk`),
  INDEX `fk_use_record_student_idx` (`student_student_pk` ASC) ,
  INDEX `fk_use_record_machine1_idx` (`machine_machine_pk` ASC) ,
  CONSTRAINT `fk_use_record_student`
    FOREIGN KEY (`student_student_pk`)
    REFERENCES `fabrication_shop`.`student` (`student_pk`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_use_record_machine1`
    FOREIGN KEY (`machine_machine_pk`)
    REFERENCES `fabrication_shop`.`machine` (`machine_pk`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FabricationShop`.`Appointment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fabrication_shop`.`appointment` (
  `id_appointment` INT NOT NULL AUTO_INCREMENT,
  `start_time` DATETIME NOT NULL,
  `organizer` VARCHAR(45) NOT NULL,
  `end_time` DATETIME NOT NULL,
  `duration` TIME GENERATED ALWAYS AS (end_time - start_time) VIRTUAL,
  PRIMARY KEY (`id_appointment`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- update 1: add constraint
ALTER TABLE student
    ADD CONSTRAINT training_constraint CHECK (training_level IN (0, 1, 2));
    
-- update 2: normalize duration
DELIMITER $$
CREATE FUNCTION `minute_diff`( dateColA datetime, dateColB datetime ) RETURNS int
DETERMINISTIC
BEGIN
   DECLARE diff INT;
   SET diff =  TIMESTAMPDIFF(MINUTE, dateColA, dateColB);
   RETURN diff;
END$$
DELIMITER ;

ALTER TABLE appointment MODIFY duration INT GENERATED ALWAYS AS (timestampdiff(MINUTE,`start_time`,`end_time`));
ALTER TABLE use_record MODIFY session_length INT GENERATED ALWAYS AS (timestampdiff(MINUTE,`date_of_sign_in`,`date_of_sign_out`));

-- update 3: add a column for the design team, who you are with, etc
ALTER TABLE student ADD identifier varchar(45);


ALTER TABLE student ADD CONSTRAINT unique_student_id UNIQUE (student_id); 
ALTER TABLE student ADD CONSTRAINT unique_net_id UNIQUE (net_id); 
ALTER TABLE machine ADD CONSTRAINT unique_machine_tag UNIQUE (machine_tag); 

insert into student (student_id, net_id, first_name, last_name, training_level) values ("20213980071", "abc170003", "Autumn", "Pin", 0); -- 1 
insert into student (student_id, net_id, first_name, last_name, training_level) values ("20213980072", "abd170003", "Brandon", "Komplin", 0); -- 2
insert into student (student_id, net_id, first_name, last_name, training_level) values ("20213980073", "abe170003", "Simi", "Soname", 1);
insert into student (student_id, net_id, first_name, last_name, training_level) values ("20213980074", "abf170003", "Wesley", "Ireland", 1);
insert into student (student_id, net_id, first_name, last_name, training_level) values ("20213980075", "abg170003", "Ronald", "Weasley", 2); -- 5
insert into student (student_id, net_id, first_name, last_name, training_level) values ("20213980076", "abh170003", "David", "Attenborough", 2);
insert into student (student_id, net_id, first_name, last_name, training_level) values ("20213980077", "abi170003", "John", "Johnson", 2);
insert into student (student_id, net_id, first_name, last_name, training_level) values ("20213980078", "abj170003", "Sam", "Samson", 2);
insert into student (student_id, net_id, first_name, last_name, training_level) values ("20213980079", "abk170003", "James", "Jameson", 2);
insert into student (student_id, net_id, first_name, last_name, training_level) values ("20213980080", "abl170003", "Jack", "Jackson", 2);
insert into student (student_id, net_id, first_name, last_name, training_level) values ("20213980081", "abm170003", "Carl", "Carlson", 2);
insert into student (student_id, net_id, first_name, last_name, training_level) values ("20213980082", "abn170003", "Robert", "Downey", 2);
insert into student (student_id, net_id, first_name, last_name, training_level) values ("20213980083", "abo170003", "Micheal", "Phelps", 2); -- 13


insert into machine (machine_name, machine_tag) values ("Vertical Band Saw", "M1"); -- 1 
insert into machine (machine_name, machine_tag) values ("Drill Press", "M2"); -- 2
insert into machine (machine_name, machine_tag) values ("Miter Saw", "M3"); -- 3
insert into machine (machine_name, machine_tag) values ("Bench Top Grinder", "M4"); -- 4
insert into machine (machine_name, machine_tag) values ("Hammers", "M5"); -- 5 
insert into machine (machine_name, machine_tag) values ("Hand Saws", "M6"); -- 6 
insert into machine (machine_name, machine_tag) values ("Hand Wrenches", "M7"); -- 7
insert into machine (machine_name, machine_tag) values ("Screw Drivers", "M8"); -- 8
insert into machine (machine_name, machine_tag) values ("Drill", "M9"); -- 8
insert into machine (machine_name, machine_tag) values ("Lathe", "M10"); -- 8
insert into machine (machine_name, machine_tag) values ("Belt Sander", "M11"); -- 8
insert into machine (machine_name, machine_tag) values ("Sheet Metal Sheer", "M12"); -- 8
insert into machine (machine_name, machine_tag) values ("Accu II Manual Mill", "M13"); -- 8
insert into machine (machine_name, machine_tag) values ("TIG Welder", "M14"); -- 8
insert into machine (machine_name, machine_tag) values ("Reamers", "M15"); -- 8
insert into machine (machine_name, machine_tag) values ("Endmill", "M16"); -- 8


insert into use_record (date_of_sign_in, date_of_sign_out, machine_machine_pk, student_student_pk) values ('2020-04-10 10:34:00', '2020-04-10 11:34:00', (SELECT machine_pk from machine WHERE machine_tag ='M1') , (SELECT student_pk from student WHERE student_id ='20213980075'));
insert into use_record (date_of_sign_in, date_of_sign_out, machine_machine_pk, student_student_pk) values ('2020-04-10 10:34:00', '2020-04-10 11:34:00', (SELECT machine_pk from machine WHERE machine_tag ='M2'), (SELECT student_pk from student WHERE student_id ='20213980075'));
insert into use_record (date_of_sign_in, date_of_sign_out, machine_machine_pk, student_student_pk) values ('2020-04-10 09:30:00', '2020-04-10 11:30:00', (SELECT machine_pk from machine WHERE machine_tag ='M1'), (SELECT student_pk from student WHERE student_id ='20213980076'));
insert into use_record (date_of_sign_in, date_of_sign_out, machine_machine_pk, student_student_pk) values ('2020-04-10 09:30:00', '2020-04-10 11:30:00', (SELECT machine_pk from machine WHERE machine_tag ='M3'), (SELECT student_pk from student WHERE student_id ='20213980076'));
insert into use_record (date_of_sign_in, date_of_sign_out, machine_machine_pk, student_student_pk) values ('2020-04-10 09:30:00', '2020-04-10 11:30:00', (SELECT machine_pk from machine WHERE machine_tag ='M4'), (SELECT student_pk from student WHERE student_id ='20213980076'));
insert into use_record (date_of_sign_in, date_of_sign_out, machine_machine_pk, student_student_pk) values ('2020-04-09 14:15:00', '2020-04-09 16:01:00', (SELECT machine_pk from machine WHERE machine_tag ='M1'), (SELECT student_pk from student WHERE student_id ='20213980080'));
insert into use_record (date_of_sign_in, date_of_sign_out, machine_machine_pk, student_student_pk) values ('2020-04-09 14:15:00', '2020-04-09 16:01:00', (SELECT machine_pk from machine WHERE machine_tag ='M8'), (SELECT student_pk from student WHERE student_id ='20213980080'));
insert into use_record (date_of_sign_in, date_of_sign_out, machine_machine_pk, student_student_pk) values ('2020-04-09 14:15:00', '2020-04-09 16:01:00', (SELECT machine_pk from machine WHERE machine_tag ='M7'), (SELECT student_pk from student WHERE student_id ='20213980080'));
insert into use_record (date_of_sign_in, date_of_sign_out, machine_machine_pk, student_student_pk) values ('2020-04-09 14:15:00', '2020-04-09 16:01:00', (SELECT machine_pk from machine WHERE machine_tag ='M6'), (SELECT student_pk from student WHERE student_id ='20213980080'));
insert into use_record (date_of_sign_in, date_of_sign_out, machine_machine_pk, student_student_pk) values ('2020-04-09 15:34:00', '2020-04-09 15:59:00', (SELECT machine_pk from machine WHERE machine_tag ='M5'), (SELECT student_pk from student WHERE student_id ='20213980083'));
insert into use_record (date_of_sign_in, date_of_sign_out, machine_machine_pk, student_student_pk) values ('2020-04-08 13:34:00', '2020-04-08 14:16:00', (SELECT machine_pk from machine WHERE machine_tag ='M1'), (SELECT student_pk from student WHERE student_id ='20213980075'));
insert into use_record (date_of_sign_in, date_of_sign_out, machine_machine_pk, student_student_pk) values ('2020-04-08 13:34:00', '2020-04-08 14:16:00', (SELECT machine_pk from machine WHERE machine_tag ='M4'), (SELECT student_pk from student WHERE student_id ='20213980075'));


insert into appointment (start_time, end_time, organizer) values ('2021-04-20 13:00:00', '2021-04-20 15:00:00', "IEEE");
insert into appointment (start_time, end_time, organizer) values ('2021-04-21 13:00:00', '2021-04-21 15:00:00', "ACM");
insert into appointment (start_time, end_time, organizer) values ('2021-04-21 10:00:00', '2021-04-21 11:00:00', "WWC");
insert into appointment (start_time, end_time, organizer) values ('2021-04-21 09:00:00', '2021-04-21 10:00:00', "SWE");
insert into appointment (start_time, end_time, organizer) values ('2021-04-22 08:00:00', '2021-04-22 10:00:00', "CS LLC");
insert into appointment (start_time, end_time, organizer) values ('2021-04-22 13:00:00', '2021-04-22 15:00:00', "UTDesign Team 1");
insert into appointment (start_time, end_time, organizer) values ('2021-04-24 13:00:00', '2021-04-24 15:00:00', "UTDesign Team 2");


