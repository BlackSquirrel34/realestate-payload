import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Property } from '@/payload-types'
import config from '@payload-config'
import { getPayload } from 'payload'

export default async function PropertiesPage({ params }: { params: { id: string } }) {
  /*   getting params asynchronously: otherwise we'll get a warning */
  const { id } = await params
  const payload = await getPayload({ config })
  const property = (await payload.findByID({
    collection: 'properties',
    id,
  })) as Property

  return (
    <div className="w-screen p-12 flex justify-center bg-accent text-sm">
      <div className="w-full max-w-lg grid gap-4">
        <Card className="gap-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{property.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex flex-row gap-1">
              {property.address.street}, {property.address.city}, {property.address.state_abbr}
            </div>
            <div className="flex flex-row gap-3">
              <h3 className="font-bold">Features</h3>
              <ul>
                {property.features?.map((feature) => {
                  /*   the next line is just to avod typescript warnings in case no feature is there */
                  /*  see the payload types: woth depth 1 features is not a number, but with depth 0 its a number */
                  if (typeof feature === 'number') return null
                  return (
                    <li key={feature.id}>
                      {feature.name} (
                      <span className="capitlize text-muted-foreground">{feature.category}</span>)
                    </li>
                  )
                })}
              </ul>
            </div>
          </CardContent>
        </Card>
        <pre className="font-mono text-xs bg-amber-950/10 p-6 rounded-2xl">
          {JSON.stringify(property, null, 2)}
        </pre>
      </div>
    </div>
  )
}
