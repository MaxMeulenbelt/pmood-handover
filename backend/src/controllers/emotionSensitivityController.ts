import EmotionSensitivityRecord from '../models/EmotionSensitivityRecord'

/**
 * Creates a new emotion sensitivity record and saves it to the database.
 */
const createNewRecord = async (userId: number, hitRate: number, falseAlarmRate: number, missCount: number) => {
  const emotionSensitivityRecord = new EmotionSensitivityRecord(userId, hitRate, falseAlarmRate, missCount)

  await emotionSensitivityRecord.saveData()
}

/**
 * Gets all the records from the emotion sensitivity table in the database and returns it.
 *
 * @returns records All the records in the emotion sensitivity table.
 */
const getAllRecords = async () => {
  const [records] = await EmotionSensitivityRecord.getAll()

  return records
}

export default {
  createNewRecord,
  getAllRecords,
}
