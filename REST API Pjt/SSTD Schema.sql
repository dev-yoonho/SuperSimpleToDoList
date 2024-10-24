CREATE DATABASE supersimpletodo;

USE supersimpletodo;

CREATE TABLE IF NOT EXISTS `task` (
	`task_id` INT PRIMARY KEY AUTO_INCREMENT,
    `user_id` VARCHAR(20) NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `priority` ENUM('1', '2', '3', '4', '5') NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `status` ENUM('완료', '진행중', '미완료') DEFAULT '미완료'
)ENGINE=InnoDB; 

INSERT INTO task (task_id, user_id, title, priority)
VALUES 
(1, 'josephcyh', 'SSR구현하기', '4'),
(2, 'josephcyh', 'REST API 공부', '2'),
(3, 'josephcyh', '동생 면접 준비', '3'),
(4, 'josephcyh', '저녁식사', '1'),
(5, 'josephcyh', '최종 프로젝트 진행하기', '5');

SELECT * FROM task;

