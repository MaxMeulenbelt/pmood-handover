import ProbabilisticReinforcementLearningRecord from '../models/ProbabilisticReinforcementLearningRecord'

/**
 * Creates a new probabilistic reinforcement learning record and saves it to the database.
 */
const createNewRecord = async (
  userId: number,
  questionNumber: number,
  leftImageName: string,
  leftImageProbability: number,
  rightImageName: string,
  rightImageProbability: number,
  userResponse: string,
  initialTimestamp: number,
  responseTimestamp: number,
  correctChoice: number
) => {
  const probabilisticReinforcementLearningRecord = new ProbabilisticReinforcementLearningRecord(
    userId,
    questionNumber,
    leftImageName,
    leftImageProbability,
    rightImageName,
    rightImageProbability,
    userResponse,
    initialTimestamp,
    responseTimestamp,
    correctChoice
  )

  await probabilisticReinforcementLearningRecord.saveData()
}

/**
 * Gets all the records from the probabilistic reinforcement learning table in the database and returns it.
 *
 * @returns records All the records in the probabilistic reinforcement learning table.
 */
const getAllRecords = async () => {
  const [records] = await ProbabilisticReinforcementLearningRecord.getAll()

  return records
}

export default {
  createNewRecord,
  getAllRecords,
}
