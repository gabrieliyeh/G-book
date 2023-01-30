import "./cell-list.css"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import AddCell from "../add-cell/AddCell"
import CellListItem from "../cell-list-item/CellListItem"
import React, {useEffect} from 'react'
import useActions from "../../hooks/useActions"


const CellList = () => {
  const cells = useTypedSelector(({cells: {order, data}})=>  {
    return order.map(id=> data[id])
  })
  const {fetchCells}= useActions()

  useEffect(()=>{
    fetchCells()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
 
  const renderedCells = cells.map(cell => 
  <React.Fragment key={cell.id}>
  <CellListItem key={cell.id} cell={cell}/>
  <AddCell previousCellId={cell.id}/>
  </React.Fragment>
  )

  return (
    <div className="cell-list">
      <AddCell forcedVisible={cells.length === 0} previousCellId={null}/>
      {renderedCells}
    </div>
  )
}

export default CellList