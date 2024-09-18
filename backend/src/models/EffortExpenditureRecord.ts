import db from '../config/db'

/**
 * A class that can be used to save and retrieve data from the effort expenditure table in the database.
 */
class EffortExpenditureRecord {
  userId: number
  trialNumber: number
  winProbability: number
  userChoice: string
  hardTaskPoints: number
  taskCompleted: number
  pointsWon: number

  constructor(userId: number, trialNumber: number, winProbability: number, userChoice: string, hardTaskPoints: number, taskCompleted: number, pointsWon: number) {
    this.userId = userId
    this.trialNumber = trialNumber
    this.winProbability = winProbability
    this.userChoice = userChoice
    this.hardTaskPoints = hardTaskPoints
    this.taskCompleted = taskCompleted
    this.pointsWon = pointsWon
  }

  /**
   * Saves the data to the effort expenditure table in the database using a prepared sql statement.
   *
   * @returns The record.
   */
  async saveData() {
    const preparedSql = `INSERT INTO effort_expenditure(
      user_id,
      trial_number,
      win_probability,
      user_choice,
      hard_task_points,
      task_completed,
      points_won,
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
      NOW()
    )
    `

    const [newEffortExpenditureRecord] = await db.execute(preparedSql, [
      this.userId,
      this.trialNumber,
      this.winProbability,
      this.userChoice,
      this.hardTaskPoints,
      this.taskCompleted,
      this.pointsWon,
    ])

    return newEffortExpenditureRecord
  }

  /**
   * Retrieves all the records from the effort expenditure table in the database.
   *
   * @returns All the records from the effort expenditure table in the database.
   */
  static getAll() {
    const sql = 'SELECT * FROM effort_expenditure;'

    return db.execute(sql)
  }
}

export default EffortExpenditureRecord
