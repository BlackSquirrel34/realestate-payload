import { seedZipCodes } from './seeders/zipcodes'

async function seed() {
  console.log('Seeding database...')

  await seedZipCodes()
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
