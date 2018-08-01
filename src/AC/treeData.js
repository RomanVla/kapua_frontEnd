/**
 * Created by cyxap on 29.7.18.
 */
import {UPDATE_TREE_DATA, DELETE_TREE_DATA, START, SUCCESS, GET_TREE_DATA, ADD_TREE_DATA_NODE, FAIL} from '../constants'
import {HOSTNAME} from '../constants/env-config'

let jsonHeader = new Headers();
jsonHeader.append('Content-type', 'application/json')

export function getTreeData() {

    return (dispatch) => {
        dispatch({
            type: GET_TREE_DATA + START,
        });

        fetch( '/api/list/', {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((data) => dispatch({
                type: GET_TREE_DATA + SUCCESS,
                payload: {treeData: data}
            }))
            .catch(err => dispatch({
                type: FAIL
            }))
    }
}

export function deleteTreeDataNode(rowInfo) {
    let {node: {id: nodeId}} = rowInfo;
    return (dispatch) => {
        dispatch({
            type: DELETE_TREE_DATA + START,
            payload: {rowInfo}
        });

        fetch(`/api/delete/?id=${nodeId}`, {
            method: 'DELETE'
        }).then(res => res.json())
            .then((res) => {
            console.log('From dlete', res);
            dispatch({
                type: DELETE_TREE_DATA + SUCCESS
            })
        }).catch(err => {
            console.log('From dlete error', err);
            dispatch({
                type: FAIL
            })}
        )
    }
}

export function addTreeDataNode(rowInfo) {
    return (dispatch) => {
        dispatch({
            type: ADD_TREE_DATA_NODE + START,
        });

        setTimeout(() => {
            dispatch({
                type: ADD_TREE_DATA_NODE + SUCCESS,
                payload: {rowInfo}
            })
        }, 1000)
    }
}

export function updateTreeData(treeDataInfo) {
    let {treeData, node, nextParentNode} = treeDataInfo;

    // this action need only to support default onChange props in ReactSortableTree for open and close tree node
    if (!treeData) {
        return {
            type: UPDATE_TREE_DATA,
            payload: {treeData: treeDataInfo}
        }
    }
    console.log('parentNode', nextParentNode);
    return (dispatch) =>
    {
        let {id: nodeId} = node;
        let parentId = 0;

        if (!!nextParentNode) {
            parentId = nextParentNode.id;
        }

        dispatch({
            type: UPDATE_TREE_DATA + START,
        });

        fetch(`/api/move/?parentId=${parentId}&id=${nodeId}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then((treeData) => {
            dispatch({
                type: UPDATE_TREE_DATA + SUCCESS,
                payload: {treeData}
            })
        }).catch( err => dispatch({
            type: FAIL
        }))


    }
}
