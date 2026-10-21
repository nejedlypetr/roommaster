-- Inserting dummy data into room_master.building
INSERT INTO room_master.building (name, street, city, postal_code) VALUES
('Main Office', '123 Main St', 'New York', '10001'),
('Conference Center', '456 Conference Ave', 'Los Angeles', '90001'),
('Tech Hub', '789 Tech Lane', 'San Francisco', '94101');

-- Inserting dummy data into room_master.floor
INSERT INTO room_master.floor (floor_number, building_id) VALUES
(1, 1),
(2, 1),
(1, 2),
(1, 3),
(2, 3);

-- Inserting dummy data into room_master.room
INSERT INTO room_master.room (room_type, room_number, opening_time, closing_time, capacity, description, floor_id, department) VALUES
('MEETING_ROOM', 101, 32, 72, 10, 'Small meeting room.', 1, 'FINANCE'),
('CONFERENCE_ROOM', 201, 32, 72, 50, 'Large conference room.', 2, 'FINANCE'),
('LECTURE_HALL', 301, 32, 72, 100, 'Auditorium for lectures.', 1, 'BACK_OFFICE'),
('INTERVIEW_ROOM', 102, 32, 72, 5, 'Room for interviews.', 1, 'BACK_OFFICE'),
('PRIVATE_ROOM', 202, 32, 72, 3, 'Room for private calls.', 2, 'SALES'),
('OTHER', 303, 9, 32, 72, 'General purpose room.', 1, 'FINANCE');

-- Demo password for every account below is password123.
INSERT INTO room_master.user (first_name, last_name, email, password, department, isheadofdepartment, role) VALUES
('John', 'Doe', 'john.doe@example.com', '$2y$10$BLd7D5fffMCiM36G0y7FIupXJc//hSb3DMDr0wlqS9IucJdY8rOkq', 'FINANCE', true, 'MAINTAINER'),
('Jane', 'Smith', 'jane.smith@example.com', '$2y$10$BLd7D5fffMCiM36G0y7FIupXJc//hSb3DMDr0wlqS9IucJdY8rOkq', 'FINANCE', false, 'USER'),
('Alice', 'Johnson', 'alice.johnson@example.com', '$2y$10$BLd7D5fffMCiM36G0y7FIupXJc//hSb3DMDr0wlqS9IucJdY8rOkq', 'BACK_OFFICE', true, 'USER'),
('Bob', 'Williams', 'bob.williams@example.com', '$2y$10$BLd7D5fffMCiM36G0y7FIupXJc//hSb3DMDr0wlqS9IucJdY8rOkq', 'BACK_OFFICE', false, 'USER'),
('Charlie', 'Brown', 'charlie.brown@example.com', '$2y$10$BLd7D5fffMCiM36G0y7FIupXJc//hSb3DMDr0wlqS9IucJdY8rOkq', 'SALES', false, 'USER');

-- Inserting dummy data into room_master.reservation
INSERT INTO room_master.reservation (room_id, purpose, start_time_slot, end_time_slot, created, description, status, reservation_date, user_id) VALUES
(1, 'MEETING', 9, 11, CURRENT_TIMESTAMP, 'Weekly team meeting.', 'ACTIVE', '2024-10-25', 1),
(2, 'CONFERENCE', 14, 16, CURRENT_TIMESTAMP, 'Annual conference event.', 'ACTIVE', '2024-10-26', 2),
(3, 'LECTURE', 10, 12, CURRENT_TIMESTAMP, 'Guest lecture series.', 'ACTIVE', '2024-10-27', 1),
(4, 'INTERVIEW', 13, 14, CURRENT_TIMESTAMP, 'Job interview with candidate.', 'ACTIVE', '2024-10-28', 1),
(5, 'PRIVATE_CALL', 15, 16, CURRENT_TIMESTAMP, 'Private call with client.', 'ACTIVE', '2024-10-29', 2);

-- Inserting dummy data into room_master.equipment
INSERT INTO room_master.equipment (room_id, equipment_type, quantity) VALUES
(1, 'TV_SCREEN', 1),
(1, 'WHITEBOARD', 1),
(2, 'FLIPCHART', 2),
(3, 'COMPUTER', 20),
(4, 'TV_SCREEN', 1),
(5, 'COMPUTER', 1);

-- Inserting dummy data into room_master.fault_log
INSERT INTO room_master.fault_log (room_id, cause, created, resolved, description) VALUES
(1, 'Projector not working.', CURRENT_TIMESTAMP, FALSE, 'The projector in the room is not turning on, possibly due to a power issue or a broken lamp.'),
(2, 'Whiteboard needs replacement.', CURRENT_TIMESTAMP, FALSE, 'The whiteboard has several scratches and is no longer suitable for use. A new board is required.'),
(3, 'Air conditioning malfunction.', CURRENT_TIMESTAMP, TRUE, 'The air conditioning unit was leaking and not cooling properly. The issue has been resolved by the maintenance team.'),
(4, 'Desk chair broken.', CURRENT_TIMESTAMP, FALSE, 'One of the desk chairs has a broken armrest, making it uncomfortable and unsafe to use.'),
(5, 'Light flickering.', CURRENT_TIMESTAMP, TRUE, 'The overhead light was flickering due to a faulty connection. The issue has been fixed.');
