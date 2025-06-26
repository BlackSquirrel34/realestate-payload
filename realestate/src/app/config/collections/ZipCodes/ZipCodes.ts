import type { CollectionConfig } from 'payload'

export const ZipCodes: CollectionConfig = {
  slug: 'zipcodes',
  /*  auth: {
    useAPIKey: true,
  }, */
  labels: {
    singular: 'Zip Code',
    plural: 'Zip Codes',
  },
  admin: {
    useAsTitle: 'code',
  },
  auth: false,
  fields: [
    {
      name: 'code',
      type: 'text',
      unique: true,
      label: 'Zip Code',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'state_abbr',
          type: 'text',
        },
        {
          name: 'state_name',
          type: 'text',
        },
        {
          name: 'county',
          type: 'text',
        },
      ],
    },

    {
      type: 'row',
      fields: [
        {
          name: 'latitude',
          type: 'number',
          admin: {
            description: 'Latitude of the zip code',
          },
          label: 'Latitude',
        },
        {
          name: 'longitude',
          type: 'number',
          admin: {
            description: 'Longitude of the zip code',
          },
          label: 'Longitude',
        },
      ],
    },

    {
      name: 'est_population',
      type: 'number',
      admin: {
        description: 'Estimated population of the zip code',
      },
      label: 'Estimated Population',
    },
  ],
}
