// allows to customize our id on the property and overwrite payloads default id which auto-increments:
// for publicly facing ids we might not want that
import { randomBytes } from 'node:crypto'

export function generatePrimaryKey(length: number = 16): string {
  return randomBytes(length).toString('hex')
}
