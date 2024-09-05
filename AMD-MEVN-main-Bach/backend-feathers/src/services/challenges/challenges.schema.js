// challenges.schema.js
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const challengeSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    description: Type.String(),
    difficulty: Type.String(),  // e.g., 'Easy', 'Medium', 'Hard'
    scoringCriteria: Type.String() // Criteria for scoring the challenge
  },
  { $id: 'Challenge', additionalProperties: false }
)
export const challengeValidator = getValidator(challengeSchema, dataValidator)
export const challengeResolver = resolve({})

export const challengeExternalResolver = resolve({})

// Schema for creating new entries
export const challengeDataSchema = Type.Pick(challengeSchema, ['description', 'difficulty', 'scoringCriteria'], {
  $id: 'ChallengeData'
})
export const challengeDataValidator = getValidator(challengeDataSchema, dataValidator)
export const challengeDataResolver = resolve({})

// Schema for updating existing entries
export const challengePatchSchema = Type.Partial(challengeSchema, {
  $id: 'ChallengePatch'
})
export const challengePatchValidator = getValidator(challengePatchSchema, dataValidator)
export const challengePatchResolver = resolve({})

// Schema for allowed query properties
export const challengeQueryProperties = Type.Pick(challengeSchema, ['_id', 'description', 'difficulty', 'scoringCriteria'])
export const challengeQuerySchema = Type.Intersect(
  [
    querySyntax(challengeQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const challengeQueryValidator = getValidator(challengeQuerySchema, queryValidator)
export const challengeQueryResolver = resolve({})
