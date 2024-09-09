import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import { Resource } from 'sst'

const getSecret = createServerFn('GET', async () => {
  return {
    stage: Resource.App.stage,
    secret: Resource.TestSecret.value,
  }
})

export const Route = createFileRoute('/')({
  loader: () => {
    return getSecret()
  },
  component: Home,
})

function Home() {
  const data = Route.useLoaderData()

  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
      <p>{data.stage}</p>
      <p>{data.secret}</p>
    </div>
  )
}
