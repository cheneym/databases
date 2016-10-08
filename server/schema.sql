DROP DATABASE chat;
CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  /* Describe your table here.*/
  id int(11),
  name varchar(255),
  primary key (id)
);

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

/* Create other tables and define schemas for them here! */

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

