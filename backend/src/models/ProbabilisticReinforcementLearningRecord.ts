import db from '../config/db'

/**
 * A class that can be used to save and retrieve data from the probabilistic reinforcement learning table in the database.
 */
class ProbabilisticReinforcementLearningRecord {
  userId: number
  questionNumber: number
  leftImageName: string
  leftImageProbability: number
  rightImageName: string
  rightImageProbability: number
  userResponse: string
  initialTimestamp: number
  responseTimestamp: number
  correctChoice: number

  constructor(
    userId: number,
    questionNumber: number,
    leftImageName: string,
    leftImageProbability: number,
    rightImageName: string,
    rightImageProbability: number,
    userResponse: string,
    initialTimestamp: number,
    responseTimestamp: number,
    correctChoice: number
  ) {
    this.userId = userId
    this.questionNumber = questionNumber
    this.leftImageName = leftImageName
    this.leftImageProbability = leftImageProbability
    this.rightImageName = rightImageName
    this.rightImageProbability = rightImageProbability
    this.userResponse = userResponse
    this.initialTimestamp = initialTimestamp
    this.responseTimestamp = responseTimestamp
    this.correctChoice = correctChoice
  }

  /**
   * Saves the data to the probabilistic reinforcement learning table in the database using a prepared sql statement.
   *
   * @returns The record.
   */
  async saveData() {
    const preparedSql = `INSERT INTO probabilistic_reinforcement_learning(
      user_id,
      question_number,
      left_image_name,
      left_image_probability,
      right_image_name,
      right_image_probability,
      user_response,
      initial_timestamp,
      response_timestamp,
      correct_choice,
      date_completed
    )
    VALUES(
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      FROM_UNIXTIME(?),
      FROM_UNIXTIME(?),
      ?,
      NOW()
    )
    `

    const [newProbabilisticReinforcementLearningRecord] = await db.execute(preparedSql, [
      this.userId,
      this.questionNumber,
      this.leftImageName,
      this.leftImageProbability,
      this.rightImageName,
      this.rightImageProbability,
      this.userResponse,
      this.initialTimestamp,
      this.responseTimestamp,
      this.correctChoice,
    ])

    return newProbabilisticReinforcementLearningRecord
  }

  /**
   * Retrieves all the records from the probabilistic reinforcement learning table in the database.
   *
   * @returns All the records from the probabilistic reinforcement learning table in the database.
   */
  static getAll() {
    const sql = 'SELECT * FROM probabilistic_reinforcement_learning;'

    return db.execute(sql)
  }
}

export default ProbabilisticReinforcementLearningRecord
