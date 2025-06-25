import { PropertyWithAddress } from '@/app/config/collections/Properties/Properties'
import { Zipcode } from '@/payload-types'
import config from '@payload-config'
import { getPayload } from 'payload'

export default async function PropertiesPage({ params }: { params: { id: string } }) {
  console.log('params:', params) // <-- add this line
  const payload = await getPayload({ config })
  const property = (await payload.findByID({
    collection: 'properties',
    id: params.id,
  })) as PropertyWithAddress

  return (
    <div>
      <h1 className="text-xl font-bold">{property.title}</h1>
      <p>
        {property.address.street}, {property.address.city}, {property.address.state_abbr},{' '}
        {property.address.zip}
      </p>
      <pre>{JSON.stringify(property, null, 2)}</pre>
    </div>
  )
}
