import db from '../config/db'

/**
 * A class that can be used to save and retrieve data from the slot machine table in the database.
 */
class UserProfileRecord {
  userId: number
  name: string
  dateOfBirth: Date
  pregnancyStatus: string
  dueDate: Date

  constructor(userId: number, name: string, dateOfBirth: Date, pregnancyStatus: string, dueDate: Date) {
    this.userId = userId
    this.name = name
    this.dateOfBirth = dateOfBirth
    this.pregnancyStatus = pregnancyStatus
    this.dueDate = dueDate
  }

  /**
   * Saves the data to the slot machine table in the database using a prepared sql statement.
   *
   * @returns The record.
   */
  async saveData() {
    const preparedSql = `INSERT INTO user_profile(
      user_id,
      name,
      date_of_birth,
      pregnancy_status,
      due_date,
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

    const [newUserProfileRecord] = await db.execute(preparedSql, [this.userId, this.name, this.dateOfBirth, this.pregnancyStatus, this.dueDate])

    return newUserProfileRecord
  }

  /**
   * Retrieves all the records from the slot machine table in the database.
   *
   * @returns All the records from the slot machine table in the database.
   */
  static getAll() {
    const sql = 'SELECT * FROM user_profile;'

    return db.execute(sql)
  }
}

export default UserProfileRecord
