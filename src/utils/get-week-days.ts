export function getWeekDays() {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })

  const weekDays = Array.from(Array(7).keys()).map((day) =>
    formatter.format(new Date(Date.UTC(2021, 5, day))),
  )

  return weekDays.map((weekDay) => {
    return weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1))
  })
}
