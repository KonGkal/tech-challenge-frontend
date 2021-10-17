import {
  SessionsQueryQuery,
  useCreateSessionMutation,
  useRunningSessionQuery,
  useSessionsQueryQuery,
  useStartSessionMutation,
} from '../../generated/graphql'
import { runningQuery, getSessionsQuery } from './graphql'

export function useGetSessions() {
  const { data, loading, error } = useSessionsQueryQuery()
  return {
    data,
    isLoading: loading,
    error,
  }
}

export type UseRunningSession =
  | {
      onCompleted?: () => void
    }
  | undefined

export function useRunningSession({ onCompleted }: UseRunningSession = {}) {
  const { data, loading } = useRunningSessionQuery()
  const [mutate, startResult] = useStartSessionMutation({ onCompleted })
  const [createSession, creationResult] = useCreateSessionMutation()
  const runningSession = data?.running_sessions[0]
  const { data: sessionData } = useGetSessions()

  const [session]: SessionsQueryQuery['sessions'] | null[] =
    sessionData && sessionData.sessions.length && data && data.running_sessions.length
      ? sessionData.sessions.filter((item) => item.name === data?.running_sessions[0].name)
      : [null]

  let continuePoint: Date | null = null

  if (session) {
    const end = new Date(session.endDate).getTime()
    const start = new Date(session.startDate).getTime()

    const taskTimeElapsed = new Date().setTime(end - start)

    const startTime = new Date()
    continuePoint = new Date(startTime)
    continuePoint.setTime(startTime.getTime() + taskTimeElapsed)
  }

  return {
    continuePoint,
    runningSession,
    isLoading: startResult.loading || loading || creationResult.loading,
    startSession: (name: string) =>
      mutate({
        variables: {
          input: {
            name,
            startDate: new Date().toISOString(),
          },
        },
        awaitRefetchQueries: true,
        // https://github.com/apollographql/apollo-client/issues/4922
        refetchQueries: [
          {
            query: runningQuery,
          },
        ],
      }),
    stop: () => {
      if (!runningSession) {
        throw new Error('Do not mutate before data has finished loading')
      }

      return createSession({
        variables: {
          input: {
            name: runningSession.name,
            startDate: runningSession.startDate,
            endDate: continuePoint?.toISOString() ?? new Date().toISOString(),
          },
        },
        awaitRefetchQueries: true,
        refetchQueries: [
          {
            query: getSessionsQuery,
          },
          {
            query: runningQuery,
          },
        ],
      })
    },
  }
}

export function useSwitchSession() {
  const { startSession, stop, runningSession, isLoading } = useRunningSession()
  const switchSession = (name: string) => {
    if (isLoading) {
      throw new Error('Do not try to switch while running session is loading')
    }
    if (!runningSession) return startSession(name)
    return stop().then(() => startSession(name))
  }
  return switchSession
}
