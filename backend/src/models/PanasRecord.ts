import db from '../config/db'

/**
 * A class that can be used to save and retrieve data from the panas table in the database.
 */
class PanasRecord {
  userId: number
  interested: number
  distressed: number
  excited: number
  upset: number
  strong: number
  guilty: number
  scared: number
  hostile: number
  enthusiastic: number
  proud: number
  irritable: number
  alert: number
  ashamed: number
  inspired: number
  nervous: number
  determined: number
  attentive: number
  jittery: number
  active: number
  afraid: number

  constructor(
    userId: number,
    interested: number,
    distressed: number,
    excited: number,
    upset: number,
    strong: number,
    guilty: number,
    scared: number,
    hostile: number,
    enthusiastic: number,
    proud: number,
    irritable: number,
    alert: number,
    ashamed: number,
    inspired: number,
    nervous: number,
    determined: number,
    attentive: number,
    jittery: number,
    active: number,
    afraid: number
  ) {
    this.userId = userId
    this.interested = interested
    this.distressed = distressed
    this.excited = excited
    this.upset = upset
    this.strong = strong
    this.guilty = guilty
    this.scared = scared
    this.hostile = hostile
    this.enthusiastic = enthusiastic
    this.proud = proud
    this.irritable = irritable
    this.alert = alert
    this.ashamed = ashamed
    this.inspired = inspired
    this.nervous = nervous
    this.determined = determined
    this.attentive = attentive
    this.jittery = jittery
    this.active = active
    this.afraid = afraid
  }

  /**
   * Saves the data to the panas table in the database using a prepared sql statement.
   *
   * @returns The record.
   */
  async saveData() {
    const preparedSql = `INSERT INTO panas(
      user_id,
      interested,
      distressed,
      excited,
      upset,
      strong,
      guilty,
      scared,
      hostile,
      enthusiastic,
      proud,
      irritable,
      alert,
      ashamed,
      inspired,
      nervous,
      determined,
      attentive,
      jittery,
      active,
      afraid,
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
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
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

    const [newPanasRecord] = await db.execute(preparedSql, [
      this.userId,
      this.interested,
      this.distressed,
      this.excited,
      this.upset,
      this.strong,
      this.guilty,
      this.scared,
      this.hostile,
      this.enthusiastic,
      this.proud,
      this.irritable,
      this.alert,
      this.ashamed,
      this.inspired,
      this.nervous,
      this.determined,
      this.attentive,
      this.jittery,
      this.active,
      this.afraid,
    ])

    return newPanasRecord
  }

  /**
   * Retrieves all the records from the panas table in the database.
   *
   * @returns All the records from the panas table in the database.
   */
  static getAll() {
    const sql = 'SELECT * FROM panas;'

    return db.execute(sql)
  }
}

export default PanasRecord
