import classes from './DayNames.module.css'

/**
 * Return a table row component containing days of the week
 * Currently start from Sunday to Saturday
 *
 * @returns <DayNames />
 */
export default function DayNames() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <tr>
      { days.map((day, index) => <th key={ index } className={ classes.dayName }>{ day }</th>) }
    </tr>
  )
}