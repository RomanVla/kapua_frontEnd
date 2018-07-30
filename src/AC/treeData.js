/**
 * Created by cyxap on 29.7.18.
 */
import {UPDATE_TREE_DATA, DELETE_TREE_DATA, START, SUCCESS, GET_TREE_DATA, ADD_TREE_DATA_NODE} from '../constants'

let testDateDjango = [{
    id: 1, data: {name: 'Computer Hardware'},
    children: [
        {id: 3, data: {name: 'Hard Drives'}},
        {
            id: 2, data: {name: 'Memory'},
            children: [
                {id: 5, data: {name: 'Desktop Memory'}},
                {id: 6, data: {name: 'Laptop Memory'}},
                {id: 7, data: {name: 'Server Memory'}}]
        },
        {id: 4, data: {name: 'SSD'}}]
}];

export function getTreeData() {
    return (dispatch) => {
        dispatch({
            type: GET_TREE_DATA + START,
        });

        setTimeout(() => {dispatch({
            type: GET_TREE_DATA + SUCCESS,
            payload: {treeData: testDateDjango }
        })}, 1000)
	}
}

export function deleteTreeDataNode(rowInfo) {
	return (dispatch) => {
		dispatch({
			type: DELETE_TREE_DATA + START,
		});

		setTimeout(() => {dispatch({
            type: DELETE_TREE_DATA + SUCCESS,
			payload: {rowInfo}
        })}, 5000)
	}
}

export function addTreeDataNode(rowInfo) {
    return (dispatch) => {
        dispatch({
            type: ADD_TREE_DATA_NODE + START,
        });

        setTimeout(() => {dispatch({
            type: ADD_TREE_DATA_NODE + SUCCESS,
            payload: {rowInfo}
        })}, 1000)
    }
}

export function updateTreeData(treeDataInfo) {
    let {treeData, node, nextParentNode} = treeDataInfo;

    // this action need only to support default onChange props in ReactSortableTree for open and close tree node
    if(!treeData){
    	console.log('from action creator update', treeDataInfo, nextParentNode)
			return{
                type: UPDATE_TREE_DATA,
                payload: {treeData: treeDataInfo}
			}
	}

	return (dispatch) => {
        let {id: nodeId} = node;
        let parentId = null;

        if(!!nextParentNode) {
            parentId = nextParentNode;
        }

        dispatch({
            type: UPDATE_TREE_DATA + START,
        });

        setTimeout(() => {dispatch({
            type: UPDATE_TREE_DATA + SUCCESS,
            payload: {treeData}
        })}, 1000)
	}
}
