import PanasRecord from '../models/PanasRecord'

/**
 * Creates a new panas record and saves it to the database.
 */
const createNewRecord = async (
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
) => {
  const panasRecord = new PanasRecord(
    userId,
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
    afraid
  )

  await panasRecord.saveData()
}

/**
 * Gets all the records from the panas table in the database and returns it.
 *
 * @returns records All the records in the panas table.
 */
const getAllRecords = async () => {
  const [records] = await PanasRecord.getAll()

  return records
}

export default {
  createNewRecord,
  getAllRecords,
}
