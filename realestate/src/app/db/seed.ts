import { seedZipCodes } from './seeders/zipcodes'
import config from '@/payload.config'
import { getPayload, Payload } from 'payload'

async function seed() {
  console.log('Seeding database...')

  const payload = await getPayload({ config })

  await seedZipCodes(payload)
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
