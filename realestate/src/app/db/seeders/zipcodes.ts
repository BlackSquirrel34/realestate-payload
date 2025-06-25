import csv from 'csv-parser'
import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

export async function seedZipCodes() {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const csvFilePath = path.resolve(__dirname, './zip_code_database.csv')
  console.log('loaded this csv file: ', csvFilePath)

  const zipCodes: any[] = []

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data: any) => {
        // filter by target counties
        zipCodes.push({
          zip: Number(data.code),
          city: data.city,
          state_abbr: data.state_abbr,
          state_name: 'Tennessee',
          county: data.county,
          latitude: Number(data.latitude),
          longitude: Number(data.longitude),
          est_population: Number(data.est_population),
        })
      })
      .on('end', () => {
        console.log(`Found ${zipCodes.length} zip codes in target counties`)
        console.log('First line: ', zipCodes[0])
        resolve()
      })
      .on('error', (error: Error) => {
        console.error('Error reading CVS file:', error)
        reject(error)
      })
  })
}
