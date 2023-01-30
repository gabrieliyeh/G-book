import "./add-cell.css"
import useActions from "../../hooks/useActions"
type AddCellProps = {
  previousCellId: string | null,
  forcedVisible?: boolean
}
const AddCell = ({previousCellId, forcedVisible}: AddCellProps) => {
  const {insertCellAfter}= useActions()
  return (
    <div className={`add-cell ${forcedVisible && 'force-visible'} `}>
      <div className="add-buttons">
      <button className="button is-rounded is-primary is-small" onClick={()=> insertCellAfter(previousCellId, 'code')}>
        <span className="icon is-small">
          <i className="fas fa-plus"></i>
        </span>
        <span>
          Code
        </span>
        </button>
        <button className="button is-rounded is-primary is-small" onClick={()=> insertCellAfter(previousCellId, 'text')}>
        <span className="icon is-small">
          <i className="fas fa-plus"></i>
        </span>
        <span>
          Text
        </span>
        </button>
      </div>
        <div className="divider">
        </div>
    </div>
  )
}

export default AddCell