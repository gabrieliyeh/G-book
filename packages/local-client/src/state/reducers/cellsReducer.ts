import { Cell } from './../cell';
import { ActionTypes } from "../action-types";
import { Action } from "../actions";
import produce from 'immer';

interface CellsState {
  loading: boolean,
  error: string | null,
  order: string[],
  data: {
    [key: string]: Cell
  }
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {}
}

const cellsReducer = produce((state: CellsState = initialState, action: Action): CellsState => {
  switch(action.type){
    case ActionTypes.SAVE_CELLS_ERROR:
      state.error = action.payload
    return state
    case ActionTypes.FETCH_CELLS:
      state.loading = true
      state.error = null
    return state
    case ActionTypes.FETCH_CELLS_COMPLETE:
      state.order = action.payload.map(cell=> cell.id)
      state.data = action.payload.reduce((acc,cell)=> {
        acc[cell.id] = cell
        return acc
      }, {} as CellsState['data'])

    return state
    case ActionTypes.FETCH_CELLS_ERROR:
      state.loading = false
      state.error = action.payload
    return state
    case ActionTypes.UPDATE_CELL:
      const {id, content}= action.payload;
      state.data[id].content = content;
      return state
    case ActionTypes.DElETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter(id=> id !== action.payload);
      return state
    case ActionTypes.INSERT_CELL_AFTER:
      const cell:Cell = {
        content: '',
        type: action.payload.type,
        id: randomId()
      }
      state.data[cell.id] = cell;
      const foundIndex = state.order.findIndex(id => id === action.payload.id)
      if(foundIndex < 0){
        state.order.unshift(cell.id)
      }else {
        state.order.splice(foundIndex + 1, 0, cell.id)
      }
      return state;
    case ActionTypes.MOVE_CELL:
      const {direction } = action.payload
      const index = state.order.findIndex((id)=> id === action.payload.id)
      const targeIndex= direction === 'up' ? index - 1 : index + 1
      if(targeIndex < 0 || targeIndex > state.order.length - 1){
        return state
      }
      state.order[index] = state.order[targeIndex]
      state.order[targeIndex] = action.payload.id
      return state
    default: 
    return state;
  }
}, initialState)

const randomId = ()=> {
  return Math.random().toString(36).substring(2,5);
}


export default cellsReducer