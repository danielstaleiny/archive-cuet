-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.2-alpha1
-- PostgreSQL version: 9.6
-- Project Site: pgmodeler.io
-- Model Author: ---


-- Database creation must be done outside a multicommand file.
-- These commands were put in this file only as a convenience.
-- -- object: cuet | type: DATABASE --
-- -- DROP DATABASE IF EXISTS cuet;
-- CREATE DATABASE cuet;
-- -- ddl-end --
-- 

-- object: public.documents | type: TABLE --
-- DROP TABLE IF EXISTS public.documents CASCADE;
CREATE TABLE public.documents (
	id uuid NOT NULL,
	url text NOT NULL,
	publisher text,
	published_date date,
	closed_date date,
	author text,
	registry_symbol text,
	registry_case text,
	name_of_document text,
	description text,
	history json,
	CONSTRAINT documents_pk PRIMARY KEY (id),
	CONSTRAINT url_unique UNIQUE (url)

);
-- ddl-end --

-- object: public.attachments | type: TABLE --
-- DROP TABLE IF EXISTS public.attachments CASCADE;
CREATE TABLE public.attachments (
	id uuid NOT NULL,
	url text NOT NULL,
	path text NOT NULL,
	path_origin text,
	id_ref text NOT NULL,
	size float,
	type text,
	id_documents uuid,
	CONSTRAINT attachments_pk PRIMARY KEY (id)

);
-- ddl-end --
COMMENT ON COLUMN public.attachments.size IS 'in bytes';
-- ddl-end --

-- object: documents_fk | type: CONSTRAINT --
-- ALTER TABLE public.attachments DROP CONSTRAINT IF EXISTS documents_fk CASCADE;
ALTER TABLE public.attachments ADD CONSTRAINT documents_fk FOREIGN KEY (id_documents)
REFERENCES public.documents (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: url_index | type: INDEX --
-- DROP INDEX IF EXISTS public.url_index CASCADE;
CREATE INDEX url_index ON public.documents
	USING btree
	(
	  url
	);
-- ddl-end --



