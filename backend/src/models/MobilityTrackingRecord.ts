import db from '../config/db'

/**
 * A class that can be used to save and retrieve data from the mobility tracking table in the database.
 */
class MobilityTrackingRecord {
  userId: number
  longitude: number
  latitude: number
  timestamp: string

  constructor(userId: number, longitude: number, latitude: number, timestamp: string) {
    this.userId = userId
    this.longitude = longitude
    this.latitude = latitude
    this.timestamp = timestamp
  }

  /**
   * Saves the data to the mobility tracking table in the database using a prepared sql statement.
   *
   * @returns The record.
   */
  async saveData() {
    const preparedSql = `INSERT INTO mobility_tracking(
      user_id,
      longitude,
      latitude,
      timestamp
    )
    VALUES(
      ?,
      ?,
      ?,
      FROM_UNIXTIME(?)
    )
    `

    const [newMobilityTrackingRecord] = await db.execute(preparedSql, [this.userId, this.longitude, this.latitude, this.timestamp])

    return newMobilityTrackingRecord
  }

  /**
   * Retrieves all the records from the mobility tracking table in the database.
   *
   * @returns All the records from the mobility tracking table in the database.
   */
  static getAll() {
    const sql = 'SELECT * FROM mobility_tracking;'

    return db.execute(sql)
  }
}

export default MobilityTrackingRecord
