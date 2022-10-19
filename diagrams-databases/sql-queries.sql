use dbHorrorShow;
insert into movie (title, runtime, rating, releaseDate, scoreNum, directorId, subgenreId)
		values
		('Carrie', 98, 'R', `1976-11-03`, 10, 1, 1);
        
insert into director (firstName, lastName, nationality)
		values
		("Brian", "De Palma", "American");

select movieId, title, runtime, rating, releaseDate, scoreNum, director.directorId, subgenre.subgenreId from movie
inner join director on director.directorId = movie.directorId inner join subgenre on subgenre.subgenreId = movie.subgenreId;

select friendAId, friendBId, name, friend.app_user_id
			from friend;
            
select directorId, firstName, lastName, nationality
			from director; 
            
select actorId, firstName, lastName, nationality
			from actor; 

select * from app_user;


select * from movie;

select * from review;

select reviewId, userReview, app_user.app_user_id, movie.movieId, movie.title, movie.runtime, movie.rating,
                movie.releaseDate, movie.scoreNum, movie.directorId, movie.subgenreId
                from review
                left outer join app_user on app_user.app_user_id = review.app_user_id
                left outer join movie on movie.movieId = review.movieId
                where app_user.app_user_id = 1;

select movieId, title, runtime, rating, releaseDate, scoreNum, d.directorId, s.subgenreId, d.firstName, d.lastName, d.nationality, s.name
from movie 
left outer join director d on d.directorId = movie.directorId
left outer join subgenre s on s.subgenreId = movie.subgenreId
where movieId = 9487;

select reviewId, userReview, app_user.app_user_id, movie.movieId, movie.title, movie.runtime, movie.rating,
 movie.releaseDate, movie.scoreNum, movie.directorId, movie.subgenreId
from review
inner join app_user on app_user.app_user_id = review.app_user_id
inner join movie on movie.movieId = review.movieId;

			
select * from review;

select * from movie_watchlist;

delete from movie_watchlist where app_user_id = 1;

