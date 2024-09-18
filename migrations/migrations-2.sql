ALTER TABLE `mobility_tracking` DROP `date_completed`;

ALTER TABLE `delay_discounting` CHANGE `date_completed` `date_completed` DATETIME NOT NULL;
ALTER TABLE `effort_expenditure` CHANGE `date_completed` `date_completed` DATETIME NOT NULL;
ALTER TABLE `emotion_sensitivity` CHANGE `date_completed` `date_completed` DATETIME NOT NULL;
ALTER TABLE `memory_recall` CHANGE `date_completed` `date_completed` DATETIME NOT NULL;
ALTER TABLE `panas` CHANGE `date_completed` `date_completed` DATETIME NOT NULL;
ALTER TABLE `probabilistic_reinforcement_learning` CHANGE `date_completed` `date_completed` DATETIME NOT NULL;
ALTER TABLE `slot_machine` CHANGE `date_completed` `date_completed` DATETIME NOT NULL;
ALTER TABLE `user_profile` CHANGE `date_completed` `date_completed` DATETIME NOT NULL;

ALTER TABLE `probabilistic_reinforcement_learning` CHANGE `initial_timestamp` `initial_timestamp` DATETIME NOT NULL;
ALTER TABLE `probabilistic_reinforcement_learning` CHANGE `response_timestamp` `response_timestamp` DATETIME NOT NULL;