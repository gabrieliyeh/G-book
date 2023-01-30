import { RootState } from './../reducers/index';
import { ActionTypes } from "../action-types";
import { Action,UpdateCellAction,DeleteCellAction,MoveCellAction,InsertCellAfterAction,Direction} from "../actions";
import { CellTypes, Cell} from "../cell";
import { Dispatch } from "redux";
import bundler from "../../bundler";
import axios from "axios";

export const updateCell = (id:string, content: string):UpdateCellAction => {
  return {
    type: ActionTypes.UPDATE_CELL,
    payload: {
      id,
      content
    }
  }
}

export const deleteCell = (id: string):DeleteCellAction => {
return {
  type: ActionTypes.DElETE_CELL,
  payload: id
}

}
export const moveCell = (id: string, direction:Direction):MoveCellAction => {
  return {
    type: ActionTypes.MOVE_CELL,
    payload: {
      id,
      direction
    }
  }
}

export const insertCellAfter = (id: string | null, cellType: CellTypes): InsertCellAfterAction=> {
  return {
    type: ActionTypes.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType
    }
  }
}

export const createBundle = (cellId: string, input: string) => {
    return async (dispatch: Dispatch<Action>)=> {
        dispatch({
          type: ActionTypes.BUNDLE_START,
          payload: {
            cellId
          }
        })

        const result = await bundler(input);
        dispatch({
          type: ActionTypes.BUNDLE_COMPLETE,
          payload:{
            cellId,
            bundle: {
              code:result.code,
              err: result.err
            }
            // bundle: result it can also be written like this because they have the same structure
          }
        })
    }
} 


export const fetchCells = ()=> {
  return async (dispatch: Dispatch<Action>)=> {

    dispatch({type: ActionTypes.FETCH_CELLS})

    try{
      const {data}:{data:Cell[]}= await axios.get('/cells')
      dispatch({
        type:ActionTypes.FETCH_CELLS_COMPLETE,
        payload: data
      })
    }catch(err:any){
      dispatch({
        type: ActionTypes.FETCH_CELLS_ERROR,
        payload: err.message
      })
    }
  }
}

export const saveCells =()=> {
  return async (dispatch: Dispatch<Action>, getState: ()=> RootState)=> {
    const {cells:{data,order}}= getState()

    const cells = order.map(id=> data[id])
    try {
      await axios.post('/cells', {cells});
    } catch (error:any) {
      dispatch({
        type: ActionTypes.SAVE_CELLS_ERROR,
        payload: error.message
      })
    }
    
  }
}