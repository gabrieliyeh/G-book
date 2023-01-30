import "./cell-list-item.css"
import { Cell } from "../../state"
import ActionBar from "../action-bar/ActionBar"
import CodeCell from "../code-cell/CodeCell"
import TextEditor from "../text-editor/TextEditor"

interface CellListItemProps {
  cell: Cell
}
const CellListItem = ({cell}: CellListItemProps) => {
  let child: JSX.Element;
  if(cell.type === 'code'){
    child =
    <>
    <div className="action-bar-wrapper"> 
    <ActionBar id={cell.id}/>
    </div>
     <CodeCell cell={cell}/>
    </>
    
   
  }else{
    child = 
    <>
     <TextEditor cell={cell}/>
     <ActionBar id={cell.id}/> 
    </>
    
  }
  return (
    <div className="cell-list-item">
      {child}

      </div>
  )
}

export default CellListItem