import DayCell from '../DayCell/DayCell'

export default function DayRow({ week, dateSelected, handleClickSelectDay, handleKeySelectDay }) {

  return (
    <tr>
      {
        week.map((day, index) => (
          <DayCell
            key={ index }
            currentDay={ day }
            dateSelected={ dateSelected }
            handleClickSelectDay={ handleClickSelectDay }
            handleKeySelectDay={ handleKeySelectDay }
          />
        ))
      }
    </tr>
  )
}