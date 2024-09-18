import MobilityTrackingRecord from '../models/MobilityTrackingRecord'

/**
 * Creates a new mobility tracking record and saves it to the database.
 */
const createNewRecord = async (userId: number, longitude: number, latitude: number, timestamp: string) => {
  const mobilityTrackingRecord = new MobilityTrackingRecord(userId, longitude, latitude, timestamp)

  await mobilityTrackingRecord.saveData()
}

/**
 * Gets all the records from the mobility tracking table in the database and returns it.
 *
 * @returns records All the records in the mobility tracking table.
 */
const getAllRecords = async () => {
  const [records] = await MobilityTrackingRecord.getAll()

  return records
}

export default {
  createNewRecord,
  getAllRecords,
}
