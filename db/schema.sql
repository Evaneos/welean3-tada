do
$body$
declare
begin

IF NOT EXISTS (SELECT * FROM information_schema.tables WHERE table_name='task' AND table_schema='public')
THEN
    CREATE TABLE task (
        id                serial NOT NULL,
        created_at        timestamp(0) without time zone NOT NULL DEFAULT now(),
        updated_at        timestamp(0) without time zone NOT NULL DEFAULT now(),
        title             varchar(255) NOT NULL,
        description       text NULL,
        parent_id         int NULL,
        rank              int NOT NULL

        CONSTRAINT pk_task PRIMARY KEY (id),
        CONSTRAINT fk_parent_id FOREIGN KEY (parent_id) REFERENCES task(id)
    )
    WITH (
        OIDS=FALSE
    );

    CREATE index i_task_parent on task USING btree(parent_id);
    CREATE index i_rank on task USING btree(rank);
END IF;

IF NOT EXISTS (SELECT * FROM information_schema.tables WHERE table_name='tag_category' AND table_schema='public')
THEN
    CREATE TABLE tag_category (
        id                serial NOT NULL,
        created_at        timestamp(0) without time zone NOT NULL DEFAULT now(),
        title             varchar(255) NOT NULL,

        CONSTRAINT pk_tagcategory PRIMARY KEY (id)
    )
    WITH (
        OIDS=FALSE
    );
END IF;

IF NOT EXISTS (SELECT * FROM information_schema.tables WHERE table_name='tag' AND table_schema='public')
THEN
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
END IF;

IF NOT EXISTS (SELECT * FROM information_schema.tables WHERE table_name='task_has_tag' AND table_schema='public')
THEN
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
END IF;

CREATE OR REPLACE FUNCTION create_task (input_title text, input_description text, input_rank integer) RETURNS int AS $$
BEGIN
    INSERT INTO task (title, description, rank) VALUES (input_title, input_description, input_rank);
    RETURN 0;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_task_parent (input_task_title text, input_parent_title text) RETURNS int AS $$
DECLARE
    id_task integer;
    id_parent integer;
BEGIN
    IF (select count(1) from task where title = input_parent_title) <> 1 THEN
        RAISE NOTICE 'Unable to find unique parent with title %', input_parent_title;
        RETURN 1;
    END IF;

    id_task := id from task where title = input_task_title;
    id_parent := id from task where title = input_parent_title;

    UPDATE task SET parent_id = id_parent WHERE id = id_task;
    RETURN 0;
END;
$$ LANGUAGE plpgsql;

end
$body$
;
