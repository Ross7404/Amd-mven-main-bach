import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const wasteSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    name: Type.String(),
    category: Type.String(), // e.g., organic, recyclable, hazardous
    description: Type.Optional(Type.String()),
    disposalMethod: Type.String() // e.g., compost, recycle, landfill
  },
  { $id: 'Waste', additionalProperties: false }
)

export const wasteValidator = getValidator(wasteSchema, dataValidator)
export const wasteResolver = resolve({})

export const wasteExternalResolver = resolve({})

// Schema for creating new entries
export const wasteDataSchema = Type.Pick(wasteSchema, ['name', 'category', 'description', 'disposalMethod'], {
  $id: 'WasteData'
})
export const wasteDataValidator = getValidator(wasteDataSchema, dataValidator)
export const wasteDataResolver = resolve({})

// Schema for updating existing entries
export const wastePatchSchema = Type.Partial(wasteSchema, {
  $id: 'WastePatch'
})
export const wastePatchValidator = getValidator(wastePatchSchema, dataValidator)
export const wastePatchResolver = resolve({})

// Schema for allowed query properties
export const wasteQueryProperties = Type.Pick(wasteSchema, ['_id', 'name', 'category', 'disposalMethod'])
export const wasteQuerySchema = Type.Intersect(
  [
    querySyntax(wasteQueryProperties),
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const wasteQueryValidator = getValidator(wasteQuerySchema, queryValidator)
export const wasteQueryResolver = resolve({})
