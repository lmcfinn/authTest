--Note: need to alter insertedAt and updatedAt to have a default value of CURRENT_TIMESTAMP
--ALTER TABLE `larocha_health`.`Events`
--CHANGE COLUMN `updatedAt` `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
--ADD UNIQUE INDEX `updatedAt_UNIQUE` (`updatedAt` ASC);



INSERT INTO events (name, description, date, time, photo_url) VALUES ('Diabetes Prevention Program Coach Training','DPP Coach Training to help your community or health care organization implement a comprehensive Diabetes Prevention Program.','2017-06-10','11:00:00','blog8.jpg' );
INSERT INTO events (name, description, date, time, photo_url) VALUES ('Get Moving Classes', 'DPP Coach Training to help your community or health care organization implement a comprehensive Diabetes Prevention Program.', '2017-06-20','11:00:00','blog5.jpg' );
INSERT INTO events (name, description, date, time, photo_url) VALUES ('Eating Right Classes', 'DPP Coach Training to help your community or health care organization implement a comprehensive Diabetes Prevention Program.','2017-06-28','11:00:00','blog4.jpg' );
INSERT INTO events (name, description, date, time, photo_url) VALUES ('Diabetes Prevention Program Coach Training', 'DPP Coach Training to help your community or health care organization implement a comprehensive Diabetes Prevention Program.','2017-07-08','11:00:00','blog8.jpg' );
INSERT INTO events (name, description, date, time, photo_url) VALUES ('Get Moving Classes', 'DPP Coach Training to help your community or health care organization implement a comprehensive Diabetes Prevention Program.','2017-07-19','11:00:00','blog5.jpg' );
INSERT INTO events (name, description, date, time, photo_url) VALUES ('Eating Right Classes', 'DPP Coach Training to help your community or health care organization implement a comprehensive Diabetes Prevention Program.', '2017-07-26','11:00:00','blog4.jpg' );
INSERT INTO events (name, description, date, time, photo_url) VALUES ('Diabetes Prevention Program Coach Training', 'DPP Coach Training to help your community or health care organization implement a comprehensive Diabetes Prevention Program.', '2017-08-12','11:00:00','blog8.jpg' );
INSERT INTO events (name, description, date, time, photo_url) VALUES ('Eating Right Classes', 'DPP Coach Training to help your community or health care organization implement a comprehensive Diabetes Prevention Program.','2017-08-16','11:00:00','blog4.jpg' );
INSERT INTO events (name, description, date, time, photo_url) VALUES ('Eating Right Classes', 'DPP Coach Training to help your community or health care organization implement a comprehensive Diabetes Prevention Program.', '2017-08-30','11:00:00','blog4.jpg' );
