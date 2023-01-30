import "./text-editor.css"
import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor"
import { Cell } from "../../state";
import useActions from "../../hooks/useActions";

type TextEditorProps = {
  cell: Cell
}
const TextEditor = ({cell}: TextEditorProps) => {
  const [editing, setEditing]= useState(false)
  const divRef= useRef<HTMLDivElement| null>(null)
  const {updateCell}= useActions()

  useEffect(()=> {
    const listener = (event:MouseEvent)=> {
      if(divRef.current && event.target && divRef.current.contains(event.target as Node)){
        return
      }
      setEditing(false)
    }

    document.addEventListener('click', listener, {capture: true})

    return ()=> {
      document.removeEventListener('click', listener, {capture: true})
    }
  }, [])
 
  if(editing){
    return (
      <div className="text-editor" ref={divRef}>
        <MDEditor value={cell.content} onChange={(v)=> updateCell(cell.id, v || '')} />
      </div>
    )
  }
  return (
    <div className="text-editor card"  onClick={()=>setEditing(true)} > 
    <div className="card-content">
      <MDEditor.Markdown source={cell.content || '# Header'} />
    </div>
    </div>
  )
}

export default TextEditor