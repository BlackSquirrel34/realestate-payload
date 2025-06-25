import { Zipcode } from '@/payload-types'
import config from '@payload-config'
import { getPayload } from 'payload'

export default async function PropertiesPage({ params }: { params: { id: string } }) {
  console.log('params:', params) // <-- add this line
  const payload = await getPayload({ config })
  const property = await payload.findByID({
    collection: 'properties',
    id: params.id,
  })
  const zipcode = property.zipcode as Zipcode

  return (
    <div>
      <h1 className="text-xl font-bold">{property.title}</h1>
      <p>
        {property.street}, {zipcode.city}, {zipcode.state_abbr}
      </p>
      <pre>{JSON.stringify(property, null, 2)}</pre>
    </div>
  )
}
