use dbHorrorShow;

select r.name from app_user_role ur 
inner join app_role r on ur.app_role_id = r.app_role_id
inner join app_user au on ur.app_user_id = au.app_user_id
where au.username = 'dracula@scary.com';

select app_user_id, username, password_hash, disabled from app_user where username = 'dracula@scary.com';

select movieId,
 title,
 runtime,
 rating,
 releaseDate,
 scoreNum,
 actorId,
 director.directorId,
 subgenre.subgenreId
from movie
inner join director on director.directorId = movie.directorId
inner join subgenre on subgenre.subgenreId = movie.subgenreId;

select * from actor_movie;
select * from actor;