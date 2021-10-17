import { gql } from '@apollo/client'
// This is picked up by graphql generator so it is not actually unused

export const getSessionsQuery = gql`
  query SessionsQuery {
    sessions {
      id
      name
      startDate
      endDate
    }
  }
`

export const createSession = gql`
  mutation createSession($input: sessions_insert_input!) {
    insert_sessions_one(
      object: $input
      on_conflict: { constraint: sessions_pkey, update_columns: [startDate, endDate] }
    ) {
      id
      name
      startDate
      endDate
    }
    delete_running_sessions(where: {}) {
      affected_rows
    }
  }
`

export const runningQuery = gql`
  query RunningSession {
    running_sessions {
      name
      startDate
    }
  }
`
export const startSession = gql`
  mutation startSession($input: running_sessions_insert_input!) {
    insert_running_sessions_one(
      object: $input
      on_conflict: { constraint: running_sessions_pkey, update_columns: [startDate] }
    ) {
      id
      name
      startDate
    }
  }
`
