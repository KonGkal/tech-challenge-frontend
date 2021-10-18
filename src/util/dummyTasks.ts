import { subDays } from 'date-fns'

export const createDummyTasks = () => {
  const datesArray = []

  for (let num = 30; num >= 0; num--) {
    const end = new Date().getTime() + Math.floor(Math.random() * 20000000)

    datesArray.push({
      id: Math.random() + Math.floor(Math.random() * 1000) + '',
      name: 'new' + Math.floor(Math.random() * 1000),
      startDate: subDays(new Date(), num).toISOString(),
      endDate: subDays(new Date().setTime(end), num).toISOString(),
      __typename: 'sessions',
    })
  }
  for (let num = 30; num >= 0; num--) {
    const end = new Date().getTime() + Math.floor(Math.random() * 20000000)

    datesArray.push({
      id: Math.random() + Math.floor(Math.random() * 1000) + '',
      name: 'new' + Math.floor(Math.random() * 1000),
      startDate: subDays(new Date(), num).toISOString(),
      endDate: subDays(new Date().setTime(end), num).toISOString(),
      __typename: 'sessions',
    })
  }

  return datesArray
}
