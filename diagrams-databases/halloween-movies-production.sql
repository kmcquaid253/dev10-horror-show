drop database if exists mydb;
create schema if not exists mydb;
use mydb;

-- non-security

create table actor (
  actorId int primary key auto_increment,
  firstName varchar(45) null,
  lastName varchar(45) null,
  nationality varchar(45) null
);

create table director (
  directorId int primary key auto_increment,
  firstName varchar(45) null,
  lastName varchar(45) null,
  nationality varchar(45) null
);

create table subgenre (
  subgenreId int primary key auto_increment,
  name varchar(50) null
);

  -- security
  
  create table app_role (
	app_role_id int primary key auto_increment,
    app_user_id int not null,
    name varchar(50) not null unique
);

  create table app_user (
	app_user_id int primary key auto_increment,
    username varchar(50) not null unique,
    password_hash varchar(2048) not null,
    disabled bit not null default(0),
    app_role_id int not null,
constraint fk_app_user_app_role_id
	foreign key (app_role_id)
    references app_role(app_role_id)
);

create table friend (
  friendAId int not null,
  friendBId int not null,
  name varchar(50) not null,
  app_user_id int not null,
constraint pk_watchlist_movie_id
	primary key (friendAId, friendBId),
constraint fk_friend_app_user
	foreign key (app_user_id)
	references app_user(app_user_id)
);

-- non-security

create table movie (
  movieId int primary key auto_increment,
  title varchar(50) not null,
  runtime varchar(50) null,
  rating varchar(50) null,
  releaseDate date null,
  scoreNum int null,
  actorId int null,
  directorId int null,
  subgenreId int null,
constraint fk_movie_directorId
    foreign key (directorId)
    references director(directorId),
constraint fk_movie_subgenreId
    foreign key (subgenreId)
    references subgenre(subgenreId)
);

create table review (
  reviewId int primary key auto_increment,
  userReview varchar(750) null,
  app_user_id int not null,
  movieId int not null,
constraint fk_review_app_user_id
	foreign key (app_user_id)
	references app_user(app_user_id),
constraint fk_review_movieId
    foreign key (movieId)
    references movie(movieId)
);

create table watchlist_movie (
    movieId int not null,
    app_user_id int not null,
constraint pk_watchlist_movie_id
	primary key (movieId, app_user_id),
constraint fk_watchlist_movie_app_user_id
	foreign key (app_user_id)
    references app_user(app_user_id),
constraint fk_watchlist_movie_movieId
	foreign key (movieId)
    references movie(movieId)
    );

create table actor_movie (
	actorId int not null,
    movieId int not null,
constraint pk_actor_movie_id
	primary key (actorId, movieId),
constraint fk_actor_movie_movieId
	foreign key (movieId)
    references movie(movieId),
constraint fk_actor_movie_actorId
	foreign key (actorId)
    references actor(actorId)
);
