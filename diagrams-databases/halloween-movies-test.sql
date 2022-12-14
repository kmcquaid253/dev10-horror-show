drop database if exists dbHorrorShowTest;
create schema if not exists dbHorrorShowTest;
use dbHorrorShowTest;

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

create table app_user (
	app_user_id int primary key auto_increment,
    username varchar(50) not null unique,
    password_hash varchar(2048) not null,
    disabled bit not null default(0)
);

create table app_role (
	app_role_id int primary key auto_increment,
    `name` varchar(50) not null unique
);

create table app_user_role (
	app_user_id int not null,
    app_role_id int not null,
    constraint pk_app_user_role
		primary key (app_user_id, app_role_id),
	constraint fk_app_user_role_user_id
		foreign key (app_user_id)
        references app_user(app_user_id),
	constraint fk_app_user_role_role_id
		foreign key (app_role_id)
        references app_role(app_role_id)
);

create table friend (
  friendAId int not null,
  friendBId int not null,
constraint pk_friend_id
	primary key (friendAId, friendBId),
constraint fk_friend_friendAId
	foreign key (friendAId)
    references app_user (app_user_id),
constraint fk_friend_friendBId
	foreign key (friendBId)
    references app_user(app_user_id)
);
-- non-security

create table movie (
  movieId int primary key,
  title varchar(50) not null,
  runtime varchar(50) null,
  rating varchar(50) null,
  releaseDate date null,
  poster_path varchar(200) null,
  scoreNum int null,
  directorId int null,
  subgenreId int null,
constraint fk_movie_directorId
    foreign key (directorId)
    references director(directorId),
constraint fk_movie_subgenreId
    foreign key (subgenreId)
    references subgenre(subgenreId)
);


insert into app_role (`name`) values
    ('USER'),
    ('ADMIN');

-- passwords are set to "P@ssw0rd!"
insert into app_user (username, password_hash, disabled)
    values
    ('dracula@scary.com', '$2a$12$b3gcHHnHcJ2Y02znwWkQoeQNvez18r5uNZxSewRnkjeHSoE5iSYii', 0),
    ('samara@scary.com', '$2a$12$b3gcHHnHcJ2Y02znwWkQoeQNvez18r5uNZxSewRnkjeHSoE5iSYii', 0),
	('chucky@scary.com', '$2a$12$b3gcHHnHcJ2Y02znwWkQoeQNvez18r5uNZxSewRnkjeHSoE5iSYii', 0),
    ('m.myers@scary.com', '$2a$12$b3gcHHnHcJ2Y02znwWkQoeQNvez18r5uNZxSewRnkjeHSoE5iSYii', 0),
    ('jason@scary.com', '$2a$12$b3gcHHnHcJ2Y02znwWkQoeQNvez18r5uNZxSewRnkjeHSoE5iSYii', 0);
    
insert into app_user_role
	values
	(1,1),
    (2,2),
    (3,1);
    
insert into friend (friendAId, friendBId)
	values
    (1,2),
    (1,3),
    (2,3),
    (1,4),
    (1,5),
    (3,4),
    (3,5),
    (4,5);
    
insert into movie (movieId, title, runtime, rating, releaseDate, scoreNum)
	values
	(1, 'Carrie', 98, 'R', '1976-11-03', 10),
	(2, 'Halloween', 95, 'R', '1978-10-27', 9),
    (3, 'Rosemarys Baby', 136, 'R', '1968-06-12', 9); 
    
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
    watchLater boolean null,
    watched boolean null,
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
    
    delimiter //
create procedure set_known_good_state()
begin

	insert into subgenre (name)
		values
		("Horror"),
        ("Thriller");

	insert into actor (firstName, lastName, nationality)
		values
        ("Sissy", "Spacek", "American");

	insert into director (firstName, lastName, nationality)
		values
		("Brian", "De Palma", "American"),
        ("John", "Carpenter", "American");
        
	insert into review (userReview, app_user_id, movieId)
		values
        ("I liked this movie.", 1, 1),
        ("This movie isn't the classic everyone thinks it is.", 2, 1);

end //
delimiter ;
