-- database name  ==== reg_numbers

drop table if exists towns;
drop table if exists reg_nums;

create table towns (
  id serial not null primary key,
  town_tag varchar(10) not null,
  town_name varchar(30) not null
):

create table reg_nums(
  id serial not null primary key,
  towns_id serial not null,
  registration_num text not null varchar(30),
  foreign key(towns_id) references towns(id)
);

insert into towns (town_tag,town_name) values('CA','Cape Town');
insert into towns (town_tag,town_name) values('CEY', 'Strand');
insert into towns (town_tag,town_name) values('CL', 'Stellenbosch');
insert into towns (town_tag,town_name) values('CJ', 'Paarl');
insert into towns (town_tag,town_name) values('CY', 'Bellville');
