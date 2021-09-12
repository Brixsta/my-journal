DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id SERIAL,
    postdate DATE NOT NULL DEFAULT CURRENT_DATE,
    content VARCHAR(8000)
);

INSERT INTO posts (content, postdate) VALUES ('App', '2021-09-01T05:00:00.000Z');
INSERT INTO posts (content, postdate) VALUES ('Journal', '2021-09-02T05:00:00.000Z');
INSERT INTO posts (content, postdate) VALUES ('my', '2021-09-03T05:00:00.000Z');
INSERT INTO posts (content, postdate) VALUES ('is', '2021-09-04T05:00:00.000Z');
INSERT INTO posts (content, postdate) VALUES ('This', '2021-09-05T05:00:00.000Z');
INSERT INTO posts (content, postdate) VALUES ('Hello', '2021-09-06T05:00:00.000Z');