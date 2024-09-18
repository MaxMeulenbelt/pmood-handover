import { RowDataPacket } from 'mysql2'

interface UserRecord extends RowDataPacket {
  id: number
  username: string
  access_token: string
}

export default UserRecord
