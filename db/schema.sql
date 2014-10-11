do
$body$
declare
begin


IF EXISTS (SELECT * FROM information_schema.tables WHERE table_name='task_has_tag' AND table_schema='public')
THEN
    DROP TABLE task_has_tag;
END IF;

IF EXISTS (SELECT * FROM information_schema.tables WHERE table_name='tag' AND table_schema='public')
THEN
    DROP TABLE tag;
END IF;

IF EXISTS (SELECT * FROM information_schema.tables WHERE table_name='tag_category' AND table_schema='public')
THEN
    DROP TABLE tag_category;
END IF;

IF EXISTS (SELECT * FROM information_schema.tables WHERE table_name='task' AND table_schema='public')
THEN
    DROP TABLE task;
END IF;


CREATE TABLE task (
    id                serial NOT NULL,
    created_at        timestamp(0) without time zone NOT NULL DEFAULT now(),
    updated_at        timestamp(0) without time zone NOT NULL DEFAULT now(),
    title             varchar(255) NOT NULL,
    description       text NULL,
    stripped_description text NULL,
    parent_id         int NULL,
    rank              int NOT NULL,

    CONSTRAINT pk_task PRIMARY KEY (id),
    CONSTRAINT fk_parent_id FOREIGN KEY (parent_id) REFERENCES task(id)
)
WITH (
    OIDS=FALSE
);

CREATE index i_task_parent on task USING btree(parent_id);
CREATE index i_rank on task USING btree(rank);


CREATE TABLE tag_category (
    id                serial NOT NULL,
    created_at        timestamp(0) without time zone NOT NULL DEFAULT now(),
    title             varchar(255) NOT NULL,

    CONSTRAINT pk_tagcategory PRIMARY KEY (id)
)
WITH (
    OIDS=FALSE
);


CREATE TABLE tag (
    id                serial NOT NULL,
    created_at        timestamp(0) without time zone NOT NULL DEFAULT now(),
    title             varchar(255) NOT NULL,
    category_id       INT NOT NULL,

    CONSTRAINT pk_tag PRIMARY KEY (id),
    CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES tag_category(id)
)
WITH (
    OIDS=FALSE
);

CREATE TABLE task_has_tag (
    id                serial NOT NULL,
    created_at        timestamp(0) without time zone NOT NULL DEFAULT now(),
    task_id           INT NOT NULL,
    tag_id            INT NOT NULL,

    CONSTRAINT pk_task_has_tag PRIMARY KEY (id),
    CONSTRAINT fk_task_id FOREIGN KEY (task_id) REFERENCES task(id),
    CONSTRAINT fk_tag_id FOREIGN KEY (tag_id) REFERENCES tag(id),
    CONSTRAINT u_task_has_tag UNIQUE (task_id, tag_id)
)
WITH (
    OIDS=FALSE
);


end
$body$
;
