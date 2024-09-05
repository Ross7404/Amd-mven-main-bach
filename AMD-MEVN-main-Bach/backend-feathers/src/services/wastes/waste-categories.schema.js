import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const wasteCategorySchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    name: Type.String(),
    description: Type.Optional(Type.String())
  },
  { $id: 'WasteCategory', additionalProperties: false }
)

export const wasteCategoryValidator = getValidator(wasteCategorySchema, dataValidator)
export const wasteCategoryResolver = resolve({})

export const wasteCategoryExternalResolver = resolve({})

// Schema for creating new entries
export const wasteCategoryDataSchema = Type.Pick(wasteCategorySchema, ['name', 'description'], {
  $id: 'WasteCategoryData'
})
export const wasteCategoryDataValidator = getValidator(wasteCategoryDataSchema, dataValidator)
export const wasteCategoryDataResolver = resolve({})

// Schema for updating existing entries
export const wasteCategoryPatchSchema = Type.Partial(wasteCategorySchema, {
  $id: 'WasteCategoryPatch'
})
export const wasteCategoryPatchValidator = getValidator(wasteCategoryPatchSchema, dataValidator)
export const wasteCategoryPatchResolver = resolve({})

// Schema for allowed query properties
export const wasteCategoryQueryProperties = Type.Pick(wasteCategorySchema, ['_id', 'name'])
export const wasteCategoryQuerySchema = Type.Intersect(
  [
    querySyntax(wasteCategoryQueryProperties),
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const wasteCategoryQueryValidator = getValidator(wasteCategoryQuerySchema, queryValidator)
export const wasteCategoryQueryResolver = resolve({})
