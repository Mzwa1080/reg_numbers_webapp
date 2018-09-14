drop table if exists towns;
--
create table towns (
  id serial not null primary key,
  town_name varchar(50) not null
);
--
drop table if exists reg_numbers;

create table reg_numbers(
  id serial not null primary key,
  towns_id serial not null,
  registration_num text not null varchar(50),
  foreign key(towns_id) references towns(id)
);

insert into towns (town_name) values('CA');
insert into towns (town_name) values('CEY');
insert into towns (town_name) values('CL');
insert into towns (town_name) values('CJ');
insert into towns (town_name) values('CN');
