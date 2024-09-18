/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import * as rfs from 'rotating-file-stream'
import expressResponse, { TypedRequestBody, TypedRequestQuery } from './helpers/expressUtils'
import Log from './helpers/Log'
import httpBasicAuth from './helpers/httpBasicAuth'
import authenticationController from './controllers/authenticationController'
import delayDiscountingController from './controllers/delayDiscountingController'
import effortExpenditureController from './controllers/effortExpenditureController'
import emotionSensitivityController from './controllers/emotionSensitivityController'
import memoryRecallController from './controllers/memoryRecallController'
import mobilityTrackingController from './controllers/mobilityTrackingController'
import panasController from './controllers/panasController'
import probabilisticReinforcementLearningController from './controllers/probabilisticReinforcementLearningController'
import slotMachineController from './controllers/slotMachineController'
import userController from './controllers/userController'
import dataFormatter from './helpers/dataFormatter'

const app = express()
const port = process.env.PORT || 3000

if (process.env.NODE_ENV === 'production') {
  /*
   * Using true is safe as long as there is a firewall blocking the port that this app is running on,
   * otherwise set the IP of the reverse proxy here.
   */
  app.set('trust proxy', true)
}

/*
 * Adding Helmet to enhance your API's security.
 */
app.use(helmet())

/*
 * Using bodyParser to parse JSON bodies into JS objects.
 */
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

/*
 * Enabling CORS for all requests.
 */
app.use(cors())

/**
 * Request logging middleware.
 */
const accessLogStream = rfs.createStream('access.log', {
  /**
   * Rotate daily.
   */
  interval: '1d',
  path: path.join(Log.getLogDir(), 'morgan'),
})
morgan.token('pathname', (req: TypedRequestQuery<{ path: string }>) => req.path ?? '')
app.use(morgan(`:method,:pathname,:status,:date[iso],:remote-addr,HTTP/:http-version,":user-agent"`, { stream: accessLogStream }))
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan(`:method :pathname :status :date[web]`))
}

/**
 * Generates an API access token for the given username.
 *
 * @param username The username to generate the access token for.
 * @returns The generated access token.
 */
app.post('/v1/login', async (req: TypedRequestBody<{ username: string }>, res) => {
  const username = req.body.username

  if (username) {
    try {
      const accessToken = await authenticationController.generateAccessToken(username)
      if (accessToken) {
        expressResponse.success(req, res, { accessToken })
      } else {
        expressResponse.unauthorised(req, res, { error: 'Username not allowed for sign-up' }, { error: 'Username not allowed' })
      }
    } catch (error) {
      expressResponse.serverError(req, res, error)
    }
  } else {
    expressResponse.badRequest(req, res)
  }
})

/**
 * Route to allow a delay discounting record to be created.
 *
 * @returns 'Record Created!' If the record was created.
 */
app.post('/v1/delay-discounting', async (req: TypedRequestBody<{ testNumber: number; trialNumber: number; nowValue: string; laterTimeFrame: string; userChoice: string }>, res) => {
  const testNumber = req.body.testNumber
  const trialNumber = req.body.trialNumber
  const nowValue = req.body.nowValue
  const laterTimeFrame = req.body.laterTimeFrame
  const userChoice = req.body.userChoice

  if (testNumber !== undefined && testNumber !== null && trialNumber !== undefined && trialNumber !== null && nowValue && laterTimeFrame && userChoice) {
    try {
      const userId = await authenticationController.validate(req)

      try {
        await delayDiscountingController.createNewRecord(userId, testNumber, trialNumber, nowValue, laterTimeFrame, userChoice)
        expressResponse.success(req, res, { message: `Record Created!` })
      } catch (error) {
        expressResponse.serverError(req, res, error)
      }
    } catch (error) {
      expressResponse.unauthorised(req, res, error)
    }
  } else {
    expressResponse.badRequest(req, res)
  }
})

/**
 * Route to allow an effort expenditure record to be created.
 *
 * @returns 'Record Created!' If the record was created.
 */
app.post(
  '/v1/effort-expenditure',
  async (req: TypedRequestBody<{ trialNumber: number; winProbability: number; userChoice: string; hardTaskPoints: number; taskCompleted: number; pointsWon: number }>, res) => {
    const trialNumber = req.body.trialNumber
    const winProbability = req.body.winProbability
    const userChoice = req.body.userChoice
    const hardTaskPoints = req.body.hardTaskPoints
    const taskCompleted = req.body.taskCompleted
    const pointsWon = req.body.pointsWon

    if (
      trialNumber !== undefined &&
      trialNumber !== null &&
      winProbability !== undefined &&
      winProbability !== null &&
      userChoice &&
      hardTaskPoints !== undefined &&
      hardTaskPoints !== null &&
      taskCompleted !== undefined &&
      taskCompleted !== null &&
      pointsWon !== undefined &&
      pointsWon !== null
    ) {
      try {
        const userId = await authenticationController.validate(req)

        try {
          await effortExpenditureController.createNewRecord(userId, trialNumber, winProbability, userChoice, hardTaskPoints, taskCompleted, pointsWon)
          expressResponse.success(req, res, { message: `Record Created!` })
        } catch (error) {
          expressResponse.serverError(req, res, error)
        }
      } catch (error) {
        expressResponse.unauthorised(req, res, error)
      }
    } else {
      expressResponse.badRequest(req, res)
    }
  }
)

/**
 * Route to allow an emotion sensitivity record to be created.
 *
 * @returns 'Record Created!' If the record was created.
 */
app.post('/v1/emotion-sensitivity', async (req: TypedRequestBody<{ hitRate: number; falseAlarmRate: number; missCount: number }>, res) => {
  const hitRate = req.body.hitRate
  const falseAlarmRate = req.body.falseAlarmRate
  const missCount = req.body.missCount

  if (hitRate !== undefined && hitRate !== null && falseAlarmRate !== undefined && falseAlarmRate !== null && missCount !== undefined && missCount !== null) {
    try {
      const userId = await authenticationController.validate(req)

      try {
        await emotionSensitivityController.createNewRecord(userId, hitRate, falseAlarmRate, missCount)
        expressResponse.success(req, res, { message: `Record Created!` })
      } catch (error) {
        expressResponse.serverError(req, res, error)
      }
    } catch (error) {
      expressResponse.unauthorised(req, res, error)
    }
  } else {
    expressResponse.badRequest(req, res)
  }
})

/**
 * Route to allow a memory recall record to be created.
 *
 * @returns 'Record Created!' If the record was created.
 */
app.post(
  '/v1/memory-recall',
  async (req: TypedRequestBody<{ numberOfWordsRemembered: number; numberOfPositiveWordsRemembered: number; numberOfNegativeWordsRemembered: number }>, res) => {
    const numberOfWordsRemembered = req.body.numberOfWordsRemembered
    const numberOfPositiveWordsRemembered = req.body.numberOfPositiveWordsRemembered
    const numberOfNegativeWordsRemembered = req.body.numberOfNegativeWordsRemembered

    if (
      numberOfWordsRemembered !== undefined &&
      numberOfWordsRemembered !== null &&
      numberOfPositiveWordsRemembered !== undefined &&
      numberOfPositiveWordsRemembered !== null &&
      numberOfNegativeWordsRemembered !== undefined &&
      numberOfNegativeWordsRemembered !== null
    ) {
      try {
        const userId = await authenticationController.validate(req)

        try {
          await memoryRecallController.createNewRecord(userId, numberOfWordsRemembered, numberOfPositiveWordsRemembered, numberOfNegativeWordsRemembered)
          expressResponse.success(req, res, { message: `Record Created!` })
        } catch (error) {
          expressResponse.serverError(req, res, error)
        }
      } catch (error) {
        expressResponse.unauthorised(req, res, error)
      }
    } else {
      expressResponse.badRequest(req, res)
    }
  }
)

/**
 * Route to allow a mobility tracking record to be created.
 *
 * @returns 'Record Created!' If the record was created.
 */
app.post('/v1/mobility-tracking', async (req: TypedRequestBody<{ longitude: number; latitude: number; timestamp: string }>, res) => {
  const longitude = req.body.longitude
  const latitude = req.body.latitude
  const timestamp = req.body.timestamp

  if (longitude !== undefined && longitude !== null && latitude !== undefined && latitude !== null && timestamp) {
    try {
      const userId = await authenticationController.validate(req)

      try {
        await mobilityTrackingController.createNewRecord(userId, longitude, latitude, timestamp)
        expressResponse.success(req, res, { message: `Record Created!` })
      } catch (error) {
        expressResponse.serverError(req, res, error)
      }
    } catch (error) {
      expressResponse.unauthorised(req, res, error)
    }
  } else {
    expressResponse.badRequest(req, res)
  }
})

/**
 * Route to allow a panas record to be created.
 *
 * @returns 'Record Created!' If the record was created.
 */
app.post(
  '/v1/panas',
  async (
    req: TypedRequestBody<{
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
    }>,
    res
  ) => {
    const interested = req.body.interested
    const distressed = req.body.distressed
    const excited = req.body.excited
    const upset = req.body.upset
    const strong = req.body.strong
    const guilty = req.body.guilty
    const scared = req.body.scared
    const hostile = req.body.hostile
    const enthusiastic = req.body.enthusiastic
    const proud = req.body.proud
    const irritable = req.body.irritable
    const alert = req.body.alert
    const ashamed = req.body.ashamed
    const inspired = req.body.inspired
    const nervous = req.body.nervous
    const determined = req.body.determined
    const attentive = req.body.attentive
    const jittery = req.body.jittery
    const active = req.body.active
    const afraid = req.body.afraid

    if (
      interested !== undefined &&
      interested !== null &&
      distressed !== undefined &&
      distressed !== null &&
      excited !== undefined &&
      excited !== null &&
      upset !== undefined &&
      upset !== null &&
      strong !== undefined &&
      strong !== null &&
      guilty !== undefined &&
      guilty !== null &&
      scared !== undefined &&
      scared !== null &&
      hostile !== undefined &&
      hostile !== null &&
      enthusiastic !== undefined &&
      enthusiastic !== null &&
      proud !== undefined &&
      proud !== null &&
      irritable !== undefined &&
      irritable !== null &&
      alert !== undefined &&
      alert !== null &&
      ashamed !== undefined &&
      ashamed !== null &&
      inspired !== undefined &&
      inspired !== null &&
      nervous !== undefined &&
      nervous !== null &&
      determined !== undefined &&
      determined !== null &&
      attentive !== undefined &&
      attentive !== null &&
      jittery !== undefined &&
      jittery !== null &&
      active !== undefined &&
      active !== null &&
      afraid !== undefined &&
      afraid !== null
    ) {
      try {
        const userId = await authenticationController.validate(req)

        try {
          await panasController.createNewRecord(
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
          expressResponse.success(req, res, { message: `Record Created!` })
        } catch (error) {
          expressResponse.serverError(req, res, error)
        }
      } catch (error) {
        expressResponse.unauthorised(req, res, error)
      }
    } else {
      expressResponse.badRequest(req, res)
    }
  }
)

/**
 * Route to allow a probabilistic reinforcement learning record to be created.
 *
 * @returns 'Record Created!' If the record was created.
 */
app.post(
  '/v1/probabilistic-reinforcement-learning',
  async (
    req: TypedRequestBody<{
      questionNumber: number
      leftImageName: string
      leftImageProbability: number
      rightImageName: string
      rightImageProbability: number
      userResponse: string
      initialTimestamp: number
      responseTimestamp: number
      correctChoice: number
    }>,
    res
  ) => {
    const questionNumber = req.body.questionNumber
    const leftImageName = req.body.leftImageName
    const leftImageProbability = req.body.leftImageProbability
    const rightImageName = req.body.rightImageName
    const rightImageProbability = req.body.rightImageProbability
    const userResponse = req.body.userResponse
    const initialTimestamp = req.body.initialTimestamp
    const responseTimestamp = req.body.responseTimestamp
    const correctChoice = req.body.correctChoice

    if (
      questionNumber !== undefined &&
      questionNumber !== null &&
      leftImageName &&
      leftImageProbability !== undefined &&
      leftImageProbability !== null &&
      rightImageName &&
      rightImageProbability !== undefined &&
      rightImageProbability !== null &&
      userResponse &&
      initialTimestamp &&
      responseTimestamp &&
      correctChoice !== undefined &&
      correctChoice !== null
    ) {
      try {
        const userId = await authenticationController.validate(req)

        try {
          await probabilisticReinforcementLearningController.createNewRecord(
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
          expressResponse.success(req, res, { message: `Record Created!` })
        } catch (error) {
          expressResponse.serverError(req, res, error)
        }
      } catch (error) {
        expressResponse.unauthorised(req, res, error)
      }
    } else {
      expressResponse.badRequest(req, res)
    }
  }
)

/**
 * Route to allow a slot machine record to be created.
 *
 * @returns 'Record Created!' If the record was created.
 */
app.post(
  '/v1/slot-machine',
  async (req: TypedRequestBody<{ numberOfGamesPlayed: number; feedbackHappy: number; feedbackContinue: number; win: number; nearMiss: number }>, res) => {
    const numberOfGamesPlayed = req.body.numberOfGamesPlayed
    const feedbackHappy = req.body.feedbackHappy
    const feedbackContinue = req.body.feedbackContinue
    const win = req.body.win
    const nearMiss = req.body.nearMiss

    if (
      numberOfGamesPlayed !== undefined &&
      numberOfGamesPlayed !== null &&
      feedbackHappy !== undefined &&
      feedbackHappy !== null &&
      feedbackContinue !== undefined &&
      feedbackContinue !== null &&
      win !== undefined &&
      win !== null &&
      nearMiss !== undefined &&
      nearMiss !== null
    ) {
      try {
        const userId = await authenticationController.validate(req)

        try {
          await slotMachineController.createNewRecord(userId, numberOfGamesPlayed, feedbackHappy, feedbackContinue, win, nearMiss)
          expressResponse.success(req, res, { message: `Record Created!` })
        } catch (error) {
          expressResponse.serverError(req, res, error)
        }
      } catch (error) {
        expressResponse.unauthorised(req, res, error)
      }
    } else {
      expressResponse.badRequest(req, res)
    }
  }
)

/**
 * Route to view all link for data export.
 *
 * @returns HTML page with links to all data export files.
 */
app.get('/export', httpBasicAuth, (req, res) => {
  res
    .send(
      `
        <h1>Export</h1>
        <p><a href="/export/delay-discounting.csv" target="_blank">delay-discounting.csv</a></p>
        <p><a href="/export/effort-expenditure.csv" target="_blank">effort-expenditure.csv</a></p>
        <p><a href="/export/emotion-sensitivity.csv" target="_blank">emotion-sensitivity.csv</a></p>
        <p><a href="/export/memory-recall.csv" target="_blank">memory-recall.csv</a></p>
        <p><a href="/export/mobility-tracking.csv" target="_blank">mobility-tracking.csv</a></p>
        <p><a href="/export/panas.csv" target="_blank">panas.csv</a></p>
        <p><a href="/export/probabilistic-reinforcement-learning.csv" target="_blank">probabilistic-reinforcement-learning.csv</a></p>
        <p><a href="/export/slot-machine.csv" target="_blank">slot-machine.csv</a></p>
        <p><a href="/export/user.csv" target="_blank">user.csv</a></p>
      `
    )
    .status(200)
  Log.log(req, 200)
})

/**
 * Route to get all delay discounting records.
 *
 * @returns delay-discounting.csv
 */
app.get('/export/delay-discounting.csv', httpBasicAuth, async (req, res) => {
  try {
    const data = await delayDiscountingController.getAllRecords()
    const csv = dataFormatter.generateCsv(JSON.stringify(data), 'delay-discounting')

    res.status(200).attachment('delay-discounting.csv').send(csv)
    Log.log(req, 200)
  } catch (error) {
    res.status(500).send('Could not retrieve data')
    Log.log(req, 500, error)
  }
})

/**
 * Route to get all effort expenditure records.
 *
 * @returns effort-expenditure.csv
 */
app.get('/export/effort-expenditure.csv', httpBasicAuth, async (req, res) => {
  try {
    const data = await effortExpenditureController.getAllRecords()
    const csv = dataFormatter.generateCsv(JSON.stringify(data), 'effort-expenditure')

    res.status(200).attachment('effort-expenditure.csv').send(csv)
    Log.log(req, 200)
  } catch (error) {
    res.status(500).send('Could not retrieve data')
    Log.log(req, 500, error)
  }
})

/**
 * Route to get all emotion sensitivity records.
 *
 * @returns emotion-sensitivity.csv
 */
app.get('/export/emotion-sensitivity.csv', httpBasicAuth, async (req, res) => {
  try {
    const data = await emotionSensitivityController.getAllRecords()
    const csv = dataFormatter.generateCsv(JSON.stringify(data), 'emotion-sensitivity')

    res.status(200).attachment('emotion-sensitivity.csv').send(csv)
    Log.log(req, 200)
  } catch (error) {
    res.status(500).send('Could not retrieve data')
    Log.log(req, 500, error)
  }
})

/**
 * Route to get all memory recall records.
 *
 * @returns memory-recall.csv
 */
app.get('/export/memory-recall.csv', httpBasicAuth, async (req, res) => {
  try {
    const data = await memoryRecallController.getAllRecords()
    const csv = dataFormatter.generateCsv(JSON.stringify(data), 'memory-recall')

    res.status(200).attachment('memory-recall.csv').send(csv)
    Log.log(req, 200)
  } catch (error) {
    res.status(500).send('Could not retrieve data')
    Log.log(req, 500, error)
  }
})

/**
 * Route to get all mobility tracking records.
 *
 * @returns mobility-tracking.csv
 */
app.get('/export/mobility-tracking.csv', httpBasicAuth, async (req, res) => {
  try {
    const data = await mobilityTrackingController.getAllRecords()
    const csv = dataFormatter.generateCsv(JSON.stringify(data), 'mobility-tracking')

    res.status(200).attachment('mobility-tracking.csv').send(csv)
    Log.log(req, 200)
  } catch (error) {
    res.status(500).send('Could not retrieve data')
    Log.log(req, 500, error)
  }
})

/**
 * Route to get all panas records.
 *
 * @returns panas.csv
 */
app.get('/export/panas.csv', httpBasicAuth, async (req, res) => {
  try {
    const data = await panasController.getAllRecords()
    const csv = dataFormatter.generateCsv(JSON.stringify(data), 'panas')

    res.status(200).attachment('panas.csv').send(csv)
    Log.log(req, 200)
  } catch (error) {
    res.status(500).send('Could not retrieve data')
    Log.log(req, 500, error)
  }
})

/**
 * Route to get all probabilistic reinforcement learning records.
 *
 * @returns probabilistic-reinforcement-learning.csv
 */
app.get('/export/probabilistic-reinforcement-learning.csv', httpBasicAuth, async (req, res) => {
  try {
    const data = await probabilisticReinforcementLearningController.getAllRecords()
    const csv = dataFormatter.generateCsv(JSON.stringify(data), 'probabilistic-reinforcement-learning')

    res.status(200).attachment('probabilistic-reinforcement-learning.csv').send(csv)
    Log.log(req, 200)
  } catch (error) {
    res.status(500).send('Could not retrieve data')
    Log.log(req, 500, error)
  }
})

/**
 * Route to get all slot machine records.
 *
 * @returns slot-machine.csv
 */
app.get('/export/slot-machine.csv', httpBasicAuth, async (req, res) => {
  try {
    const data = await slotMachineController.getAllRecords()
    const csv = dataFormatter.generateCsv(JSON.stringify(data), 'slot-machine')

    res.status(200).attachment('slot-machine.csv').send(csv)
    Log.log(req, 200)
  } catch (error) {
    res.status(500).send('Could not retrieve data')
    Log.log(req, 500, error)
  }
})

/**
 * Route to get all user records.
 *
 * @returns user.csv
 */
app.get('/export/user.csv', httpBasicAuth, async (req, res) => {
  try {
    const data = await userController.getAllRecords()
    const csv = dataFormatter.generateCsv(JSON.stringify(data), 'user')

    res.status(200).attachment('user.csv').send(csv)
    Log.log(req, 200)
  } catch (error) {
    res.status(500).send('Could not retrieve data')
    Log.log(req, 500, error)
  }
})

/**
 * Start the Express server.
 */
app.listen(port, () => {
  Log.silly(`Server started at http://localhost:${port}`)
})
