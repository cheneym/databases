DROP DATABASE chat;
CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  /* Describe your table here.*/
  id int(11),
  name varchar(255),
  primary key (id)
);

/* Create other tables and define schemas for them here! */
CREATE TABLE rooms (
  /* Describe your table here.*/
  id int(11),
  name varchar(255),
  primary key (id)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id int(11),
  text varchar(255),
  user_id int(11),
  room_id int(11),
  createdAt varchar(255),
  primary key (id),
  foreign key (user_id) references users(id) on delete cascade,
  foreign key (room_id) references rooms(id) on delete cascade
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

/*
server start commands
-------------------------
load schema: mysql -u root < path/to/schema.sql
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