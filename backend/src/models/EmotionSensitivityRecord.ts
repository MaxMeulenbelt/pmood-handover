import db from '../config/db'

/**
 * A class that can be used to save and retrieve data from the emotion sensitivity table in the database.
 */
class EmotionSensitivityRecord {
  userId: number
  hitRate: number
  falseAlarmRate: number
  missCount: number

  constructor(userId: number, hitRate: number, falseAlarmRate: number, missCount: number) {
    this.userId = userId
    this.hitRate = hitRate
    this.falseAlarmRate = falseAlarmRate
    this.missCount = missCount
  }

  /**
   * Saves the data to the emotion sensitivity table in the database using a prepared sql statement.
   *
   * @returns The record.
   */
  async saveData() {
    const preparedSql = `INSERT INTO emotion_sensitivity(
      user_id,
      hit_rate,
      false_alarm_rate,
      miss_count,
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

    const [newEmotionSensitivityRecord] = await db.execute(preparedSql, [this.userId, this.hitRate, this.falseAlarmRate, this.missCount])

    return newEmotionSensitivityRecord
  }

  /**
   * Retrieves all the records from the emotion sensitivity table in the database.
   *
   * @returns All the records from the emotion sensitivity table in the database.
   */
  static getAll() {
    const sql = 'SELECT * FROM emotion_sensitivity;'

    return db.execute(sql)
  }
}

export default EmotionSensitivityRecord
