import db from '../config/db'

/**
 * A class that can be used to save and retrieve data from the memory recall table in the database.
 */
class MemoryRecallRecord {
  userId: number
  numberOfWordsRemembered: number
  numberOfPositiveWordsRemembered: number
  numberOfNegativeWordsRemembered: number

  constructor(userId: number, numberOfWordsRemembered: number, numberOfPositiveWordsRemembered: number, numberOfNegativeWordsRemembered: number) {
    this.userId = userId
    this.numberOfWordsRemembered = numberOfWordsRemembered
    this.numberOfPositiveWordsRemembered = numberOfPositiveWordsRemembered
    this.numberOfNegativeWordsRemembered = numberOfNegativeWordsRemembered
  }

  /**
   * Saves the data to the memory recall table in the database using a prepared sql statement.
   *
   * @returns The record.
   */
  async saveData() {
    const preparedSql = `INSERT INTO memory_recall(
      user_id,
      number_of_words_remembered,
      number_of_positive_words_remembered,
      number_of_negative_words_remembered,
      date_completed
    )
    VALUES(
      ?,
      ?,
      ?,
      ?,
      NOW()
    )
    `

    const [newMemoryRecallRecord] = await db.execute(preparedSql, [
      this.userId,
      this.numberOfWordsRemembered,
      this.numberOfPositiveWordsRemembered,
      this.numberOfNegativeWordsRemembered,
    ])

    return newMemoryRecallRecord
  }

  /**
   * Retrieves all the records from the memory recall table in the database.
   *
   * @returns All the records from the memory recall table in the database.
   */
  static getAll() {
    const sql = 'SELECT * FROM memory_recall;'

    return db.execute(sql)
  }
}

export default MemoryRecallRecord
