CREATE TABLE blogs(
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes numeric DEFAULT 0
)

insert into blogs (author, url, title) values('Creator', 'creator.com', 'Creatingcreators')
insert into blogs (author, url, title) values('Deletor', 'deletor.com', 'Deletingcreators')
