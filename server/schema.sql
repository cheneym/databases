DROP DATABASE chat;
CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  /* Describe your table here.*/
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  primary key (id)
);

/* Create other tables and define schemas for them here! */
CREATE TABLE rooms (
  /* Describe your table here.*/
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  primary key (id)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id int(11) NOT NULL AUTO_INCREMENT,
  text varchar(255) NOT NULL,
  user_id int(11) NOT NULL,
  room_id int(11) NOT NULL,
  createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  primary key (id),
  foreign key (user_id) references users(id) on delete cascade on update cascade,
  foreign key (room_id) references rooms(id) on delete cascade on update cascade
);
/*insert into users (name) values ('name');
insert into rooms (name) values ('yolo');
insert into messages (id, text, user_id, room_id) values (1, '123', 1, 1);
*/
/*  Execute this file from the command line by typing:
 *    mysql -u root -p < server/schema.sql
 *  to create the database and the tables.*/

/*
server start commands
-------------------------
load schema: mysql -u root -p < server/schema.sql
start server: mysql.server start
stop server: mysql.server stop
login: mysql -u root -p


inside mysql commands
-------------------------
--------display----------
show tables
describe <table>
.schema <table>

--------query----------
select * from <table>
select * from <table> <alias> inner join <table> <alias> 

--------insert----------
INSERT INTO <table>
VALUES('a1','b1'),
      ('a2','b2');

--------delete----------
delete from <table>           where a=2;

--------update----------
update <table> set <columname> ... operation

--------conditions------
*/