import "./code-cell.css"
import {useEffect} from "react";
import CodeEditor from "../code-editor/CodeEditor";
import Preview from "../preview/Preview";
import Resizable from "../resizable/Resizable";
import { Cell } from "../../state";
import useActions from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useCumulativeCode } from "../../hooks/useCumulativeCode";

type CodeCellProps = {
  cell: Cell
}

const CodeCell = ({cell}:CodeCellProps) => {
 
  const {updateCell, createBundle}= useActions()
  const bundle= useTypedSelector(state => state.bundles[cell.id])
  const cumulativeCode = useCumulativeCode(cell.id)
 
  useEffect(()=> {
    if(!bundle){
      createBundle(cell.id, cumulativeCode);
      return;
    }
    const timer = setTimeout(async()=> {
      createBundle(cell.id, cumulativeCode)
    }, 1000) 

    return ()=> clearTimeout(timer)
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[cumulativeCode, cell.id, createBundle])

  return (
    <Resizable direction="vertical">
    <div style={{height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row'}}>
      <Resizable direction="horizontal">
      <CodeEditor 
      initialValue={cell.content}
      onChange= {value=> updateCell(cell.id, value)}
      />
      </Resizable> 
      <div className="progress-wrapper">
        {!bundle || bundle.loading ? 
        (
            <div className="progress-cover">
              <progress className="progress is-small is-primary " max='100'>
                  Loading
              </progress>
            </div>  
        ):
        (
        <Preview error={bundle.err} code={bundle.code}/>
          )}
       </div> 
    </div>
    </Resizable>
  );
}

export default CodeCell;
