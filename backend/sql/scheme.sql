----------- drop everything  -----------

DROP SCHEMA IF EXISTS room_master CASCADE;

----------- create everything  -----------

CREATE SCHEMA room_master;

CREATE TYPE room_master.equipment_type AS ENUM (
    'TV_SCREEN',
    'WHITEBOARD',
    'FLIPCHART',
    'COMPUTER'
);

CREATE TYPE room_master.room_type AS ENUM (
    'MEETING_ROOM',
    'CONFERENCE_ROOM',
    'LECTURE_HALL',
    'INTERVIEW_ROOM',
    'PRIVATE_ROOM',
    'OTHER'
);

CREATE TYPE room_master.reservation_purpose AS ENUM (
    'CONFERENCE',
    'MEETING',
    'LECTURE',
    'SEMINAR',
    'PRIVATE_CALL',
    'INTERVIEW',
    'TRAINING',
    'WORKSHOP',
    'OTHER'
);

CREATE TYPE room_master.reservation_status AS ENUM (
    'ACTIVE',
    'CANCELLED'
);

CREATE TYPE room_master.role AS ENUM (
    'USER',
    'MAINTAINER'
);

CREATE TYPE room_master.department AS ENUM (
    'FINANCE',
    'HR',
    'IT',
    'CUSTOMER_SERVICE',
    'MARKETING',
    'LEGAL',
    'OPERATIONS',
    'SALES',
    'BACK_OFFICE'
);

CREATE TABLE room_master.user (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    department room_master.department NOT NULL,
    role room_master.role NOT NULL DEFAULT 'USER',
    isHeadOfDepartment BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE room_master.building (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    street VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    postal_code VARCHAR(20) NOT NULL
);

CREATE TABLE room_master.floor (
    id SERIAL PRIMARY KEY,
    floor_number INT NOT NULL,
    building_id INT REFERENCES room_master.building (id) ON DELETE CASCADE
);

CREATE TABLE room_master.room (
    id SERIAL PRIMARY KEY,
    room_type room_master.room_type NOT NULL,
    room_number INT NOT NULL,
    opening_time INT NOT NULL,
    closing_time INT NOT NULL,
    capacity INT NOT NULL,
    description TEXT,
    department room_master.department NOT NULL,
    floor_id INT REFERENCES room_master.floor (id) ON DELETE CASCADE
);

CREATE TABLE room_master.reservation (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES room_master.user (id) ON DELETE CASCADE,
    room_id INT REFERENCES room_master.room (id) ON DELETE CASCADE,
    purpose room_master.reservation_purpose NOT NULL,
    start_time_slot INT NOT NULL,
    end_time_slot INT NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    status room_master.reservation_status NOT NULL,
    reservation_date DATE NOT NULL
);

CREATE TABLE room_master.equipment (
    id SERIAL PRIMARY KEY,
    room_id INT REFERENCES room_master.room (id) ON DELETE CASCADE,
    equipment_type room_master.equipment_type NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0)
);

CREATE TABLE room_master.fault_log (
    id SERIAL PRIMARY KEY,
    room_id INT REFERENCES room_master.room (id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    cause VARCHAR(100) NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved BOOLEAN DEFAULT FALSE
);

CREATE OR REPLACE VIEW room_master.building_floor_room_view AS
SELECT
    b.id AS building_id,
    b.name AS building_name,
    b.street AS building_street,
    b.city AS building_city,
    b.postal_code AS building_postal_code,
    f.id AS floor_id,
    f.floor_number AS floor_number,
    r.id AS room_id,
    r.room_type AS room_type,
    r.room_number AS room_number,
    r.opening_time AS opening_time,
    r.closing_time AS closing_time,
    r.capacity AS capacity,
    r.description AS room_description
FROM
    room_master.building b
JOIN
    room_master.floor f ON b.id = f.building_id
JOIN
    room_master.room r ON f.id = r.floor_id;

--
-- CREATE OR REPLACE VIEW room_master.room_equipment_view AS
-- SELECT
--     r.id AS room_id,
--     r.room_type AS room_type,
--     r.room_number AS room_number,
--     r.opening_time AS opening_time,
--     r.closing_time AS closing_time,
--     r.capacity AS capacity,
--     r.description AS room_description,
--     e.id AS equipment_id,
--     e.equipment_type AS equipment_type,
--     e.quantity AS equipment_quantity
-- FROM
--     room_master.room r
-- LEFT JOIN
--     room_master.equipment e ON r.id = e.room_id;
--
-- CREATE OR REPLACE VIEW room_master.room_fault_view AS
-- SELECT
--     r.id AS room_id,
--     r.room_type AS room_type,
--     r.room_number AS room_number,
--     r.opening_time AS opening_time,
--     r.closing_time AS closing_time,
--     r.capacity AS capacity,
--     r.description AS room_description,
--     f.id AS fault_id,
--     f.description AS fault_description,
--     f.created AS fault_created,
--     f.resolved AS fault_resolved
-- FROM
--     room_master.room r
-- LEFT JOIN
--     room_master.fault_log f ON r.id = f.room_id;
--


