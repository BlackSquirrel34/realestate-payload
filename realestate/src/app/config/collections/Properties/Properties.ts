import { AfterReadHook } from 'node_modules/payload/dist/collections/config/types'
import type { CollectionConfig } from 'payload'
import type { JSONSchema4 } from 'json-schema'

const formatAddress: AfterReadHook = async ({ doc }) => {
  console.log({ doc }, { location: doc.location })
  // you can add to the document but ensure to not remove anything
  // make sure to add any new virtual fields BELOW the doc

  return {
    ...doc,
    address: {
      street: doc.street,
      city: doc.location.city,
      state: doc.location.state_name,
      state_abbr: doc.location.state_abbr,
      zip: doc.location.zip,
    },
  }
}

export const Properties: CollectionConfig = {
  slug: 'properties',
  /*  auth: {
    useAPIKey: true,
    disableLocalStrategy: true,
  }, */
  admin: {
    useAsTitle: 'title',
    preview: ({ id }) => `http://localhost:3000/properties/${id}`,
  },
  auth: false,
  fields: [
    // generating cutom id, length 8 bytes using helper function from lib
    /*  {
      name: 'id',
      type: 'text',
      admin: {
        hidden: true,
      },
      defaultValue: () => generatePrimaryKey(8),
    }, */
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'street',
      type: 'text',
      required: true,
      label: 'Street Address',
    },
    {
      name: 'address',
      type: 'text',
      required: false,
      admin: {
        hidden: false,
      },
      /*       payload types thinks address iwil be a string. but we want an object. */
      typescriptSchema: [
        () => {
          const address: JSONSchema4 = {
            type: 'object',
            properties: {
              street: { type: 'string' },
              city: { type: 'string' },
              state: { type: 'string' },
              state_abbr: { type: 'string' },
              zip: { type: 'string' },
            },
            required: ['street', 'city', 'state', 'state_abbr', 'zip'],
          }

          return address
        },
      ],
    },
    {
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
      required: true,
      hasMany: false, // only one zipcode can be connected
      admin: {
        description: 'Select a ZIP code fort this property.',
      },
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'listingStatus',
      type: 'select',
      required: true,
      hasMany: false,
      options: [
        {
          label: 'For Sale',
          value: 'forsale',
        },
        {
          label: 'Offer Pending',
          value: 'pending',
        },
        {
          label: 'Under Contract',
          value: 'contract',
        },
        {
          label: 'Sold',
          value: 'sold',
        },
        {
          label: 'Not For Sale',
          value: 'notforsale',
        },
      ],
    },
    {
      name: 'features',
      type: 'relationship',
      relationTo: 'features',
      hasMany: true,
    },
  ],
  hooks: {
    afterRead: [formatAddress],
  },
}
