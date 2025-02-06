CREATE TABLE people (
	id		int PRIMARY KEY,
	gender		char(1) NOT NULL, -- fixed length, padded by spaces
	name		varchar(50) NOT NULL, -- variable length, unpadded
	birthday	date
);

INSERT INTO people (id, name, gender, birthday)
	VALUES (1, 'Tyler', 'M', '1989-08-02');

SELECT id, name
	FROM people
	WHERE gender = 'M'
	ORDER BY name, birthday;

UPDATE people
	SET name = 'Brazier', id = 9
	WHERE id = 1;

DELETE FROM people
	WHERE id = 1;

DROP TABLE people;
