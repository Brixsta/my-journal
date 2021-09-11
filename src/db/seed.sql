DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id SERIAL,
    postdate DATE NOT NULL DEFAULT CURRENT_DATE,
    content VARCHAR(8000)
);

INSERT INTO posts (content, postdate) VALUES ('Coolio', '2021-09-08T05:00:00.000Z');
INSERT INTO posts (content, postdate) VALUES ('Chuck', '2021-09-09T05:00:00.000Z');
INSERT INTO posts (content, postdate) VALUES ('Brixey', '2021-09-10T05:00:00.000Z');