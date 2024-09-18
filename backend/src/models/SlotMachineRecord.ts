import db from '../config/db'

/**
 * A class that can be used to save and retrieve data from the slot machine table in the database.
 */
class SlotMachineRecord {
  userId: number
  numberOfGamesPlayed: number
  feedbackHappy: number
  feedbackContinue: number
  win: number
  nearMiss: number

  constructor(userId: number, numberOfGamesPlayed: number, feedbackHappy: number, feedbackContinue: number, win: number, nearMiss: number) {
    this.userId = userId
    this.numberOfGamesPlayed = numberOfGamesPlayed
    this.feedbackHappy = feedbackHappy
    this.feedbackContinue = feedbackContinue
    this.win = win
    this.nearMiss = nearMiss
  }

  /**
   * Saves the data to the slot machine table in the database using a prepared sql statement.
   *
   * @returns The record.
   */
  async saveData() {
    const preparedSql = `INSERT INTO slot_machine(
      user_id,
      number_of_games_played,
      feedback_happy,
      feedback_continue,
      win,
      nearMiss,
      date_completed
    )
    VALUES(
      ?,
      ?,
      ?,
      ?,
      ?,
      NOW()
    )
    `

    const [newSlotMachineRecord] = await db.execute(preparedSql, [this.userId, this.numberOfGamesPlayed, this.feedbackHappy, this.feedbackContinue, this.win, this.nearMiss])

    return newSlotMachineRecord
  }

  /**
   * Retrieves all the records from the slot machine table in the database.
   *
   * @returns All the records from the slot machine table in the database.
   */
  static getAll() {
    const sql = 'SELECT * FROM slot_machine;'

    return db.execute(sql)
  }
}

export default SlotMachineRecord
