import db from '../config/db'

/**
 * A class that can be used to save and retrieve data from the delay discounting table in the database.
 */
class DelayDiscountingRecord {
  userId: number
  testNumber: number
  trialNumber: number
  nowValue: string
  laterTimeFrame: string
  userChoice: string

  constructor(userId: number, testNumber: number, trialNumber: number, nowValue: string, laterTimeFrame: string, userChoice: string) {
    this.userId = userId
    this.testNumber = testNumber
    this.trialNumber = trialNumber
    this.nowValue = nowValue
    this.laterTimeFrame = laterTimeFrame
    this.userChoice = userChoice
  }

  /**
   * Saves the data to the delay discounting table in the database using a prepared sql statement.
   *
   * @returns The record.
   */
  async saveData() {
    const preparedSql = `INSERT INTO delay_discounting(
      user_id,
      test_number,
      trial_number,
      now_value,
      later_time_frame,
      user_choice,
      date_completed
    )
    VALUES(
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      NOW()
    )
    `

    const [newDelayDiscountingRecord] = await db.execute(preparedSql, [this.userId, this.testNumber, this.trialNumber, this.nowValue, this.laterTimeFrame, this.userChoice])

    return newDelayDiscountingRecord
  }

  /**
   * Retrieves all the records from the delay discounting table in the database.
   *
   * @returns All the records from the delay discounting table in the database.
   */
  static getAll() {
    const sql = 'SELECT * FROM delay_discounting;'

    return db.execute(sql)
  }
}

export default DelayDiscountingRecord
