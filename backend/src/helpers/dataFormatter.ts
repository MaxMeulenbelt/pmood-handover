/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

import DatabaseTable from '../models/DatabaseTable'

/**
 * Converts the data from the database into csv format.
 *
 * @param dataJsonString All records in the table in string format.
 * @param table The table the data is from.
 * @returns The data in csv format.
 */
const generateCsv = (dataJsonString: string, table: DatabaseTable) => {
  const data = JSON.parse(dataJsonString)
  let csv = ''

  switch (table) {
    case 'delay-discounting':
      csv += 'id,user_id,test_number,trial_number,now_value,later_time_frame,user_choice,date_completed\n'
      for (const row of data) {
        csv += String(row.id) + ','
        csv += String(row.user_id) + ','
        csv += String(row.test_number) + ','
        csv += String(row.trial_number) + ','
        csv += String(row.now_value) + ','
        csv += String(row.later_time_frame) + ','
        csv += String(row.user_choice) + ','
        csv += String(row.date_completed) + '\n'
      }
      break

    case 'effort-expenditure':
      csv += 'id,user_id,trial_number,win_probability,user_choice,hard_task_points,task_completed,points_won,date_completed\n'
      for (const row of data) {
        csv += String(row.id) + ','
        csv += String(row.user_id) + ','
        csv += String(row.trial_number) + ','
        csv += String(row.win_probability) + ','
        csv += String(row.user_choice) + ','
        csv += String(row.hard_task_points) + ','
        csv += String(row.task_completed) + ','
        csv += String(row.points_won) + ','
        csv += String(row.date_completed) + '\n'
      }
      break

    case 'emotion-sensitivity':
      csv += 'id,user_id,hit_rate,false_alarm_rate,miss_count,date_completed\n'
      for (const row of data) {
        csv += String(row.id) + ','
        csv += String(row.user_id) + ','
        csv += String(row.hit_rate) + ','
        csv += String(row.false_alarm_rate) + ','
        csv += String(row.miss_count) + ','
        csv += String(row.date_completed) + '\n'
      }
      break

    case 'memory-recall':
      csv += 'id,user_id,number_of_words_remembered,number_of_positive_words_remembered,number_of_negative_words_remembered,date_completed\n'
      for (const row of data) {
        csv += String(row.id) + ','
        csv += String(row.user_id) + ','
        csv += String(row.number_of_words_remembered) + ','
        csv += String(row.number_of_positive_words_remembered) + ','
        csv += String(row.number_of_negative_words_remembered) + ','
        csv += String(row.date_completed) + '\n'
      }
      break

    case 'mobility-tracking':
      csv += 'id,user_id,longitude,latitude,timestamp\n'
      for (const row of data) {
        csv += String(row.id) + ','
        csv += String(row.user_id) + ','
        csv += String(row.longitude) + ','
        csv += String(row.latitude) + ','
        csv += String(row.timestamp) + '\n'
      }
      break

    case 'panas':
      csv +=
        'id,user_id,interested,distressed,excited,upset,strong,guilty,scared,hostile,enthusiastic,proud,irritable,alert,ashamed,inspired,nervous,determined,attentive,active,afraid,date_completed\n'
      for (const row of data) {
        csv += String(row.id) + ','
        csv += String(row.user_id) + ','
        csv += String(row.interested) + ','
        csv += String(row.distressed) + ','
        csv += String(row.excited) + ','
        csv += String(row.upset) + ','
        csv += String(row.strong) + ','
        csv += String(row.guilty) + ','
        csv += String(row.scared) + ','
        csv += String(row.hostile) + ','
        csv += String(row.enthusiastic) + ','
        csv += String(row.proud) + ','
        csv += String(row.irritable) + ','
        csv += String(row.alert) + ','
        csv += String(row.ashamed) + ','
        csv += String(row.inspired) + ','
        csv += String(row.nervous) + ','
        csv += String(row.determined) + ','
        csv += String(row.attentive) + ','
        csv += String(row.jittery) + ','
        csv += String(row.active) + ','
        csv += String(row.afraid) + ','
        csv += String(row.date_completed) + '\n'
      }
      break

    case 'probabilistic-reinforcement-learning':
      csv +=
        'id,user_id,question_number,left_image_name,left_image_probability,right_image_name,right_image_probability,user_response,initial_timestamp,response_timestamp,correct_choice,date_completed\n'
      for (const row of data) {
        csv += String(row.id) + ','
        csv += String(row.user_id) + ','
        csv += String(row.question_number) + ','
        csv += String(row.left_image_name) + ','
        csv += String(row.left_image_probability) + ','
        csv += String(row.right_image_name) + ','
        csv += String(row.right_image_probability) + ','
        csv += String(row.user_response) + ','
        csv += String(row.initial_timestamp) + ','
        csv += String(row.response_timestamp) + ','
        csv += String(row.correct_choice) + ','
        csv += String(row.date_completed) + '\n'
      }
      break

    case 'slot-machine':
      csv += 'id,user_id,number_of_games_played,feedback_happy,feedback_continue,win,date_completed\n'
      for (const row of data) {
        csv += String(row.id) + ','
        csv += String(row.user_id) + ','
        csv += String(row.number_of_games_played) + ','
        csv += String(row.feedback_happy) + ','
        csv += String(row.feedback_continue) + ','
        csv += String(row.win) + ','
        csv += String(row.date_completed) + '\n'
      }
      break

    case 'user':
      csv += 'id,username\n'
      for (const row of data) {
        csv += String(row.id) + ','
        csv += String(row.username) + '\n'
      }
      break
  }

  return csv.substring(0, csv.length - 1)
}

export default {
  generateCsv,
}
