import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {
  const data = await getServerSession(authOptions)
  return (
    <main> 
      <div>hello!!</div>
      <div>{JSON.stringify(data)}</div>
    </main>
  )
}
