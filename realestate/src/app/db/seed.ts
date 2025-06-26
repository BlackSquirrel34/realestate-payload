import { seedLocations } from './seeders/locations'
import config from '@/payload.config'
import { getPayload, Payload } from 'payload'
import { seedFeatures } from './seeders/features'

async function seed() {
  console.log('Seeding database...')

  const payload = await getPayload({ config })

  // clear all previous collections
  // NOTE: this was not sufficient. we need to manually delete in supabase for this to work.
  await payload.delete({
    collection: 'locations',
    where: {},
  })

  await payload.delete({
    collection: 'properties',
    where: {},
  })

  await payload.delete({
    collection: 'features',
    where: {},
  })

  console.log('Clearing all collections first...')
  console.log('Seeding starts now...')

  await seedLocations(payload)
  await seedFeatures(payload)
}

seed()
  .then(() => {
    console.log('Database seeded successfully')
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
