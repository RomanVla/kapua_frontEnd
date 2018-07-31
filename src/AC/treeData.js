/**
 * Created by cyxap on 29.7.18.
 */
import {UPDATE_TREE_DATA, DELETE_TREE_DATA, START, SUCCESS, GET_TREE_DATA, ADD_TREE_DATA_NODE, FAIL} from '../constants'
import {HOSTNAME} from '../constants/env-config'

let jsonHeader = new Headers();
jsonHeader.append('Content-type', 'application/json')

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

        fetch( `/api/category/list/`, {
            method: 'GET',
            headers: jsonHeader
        })
            .then((res) => res.json())
            .then((data) => dispatch({
                type: GET_TREE_DATA + SUCCESS,
                payload: {treeData: data}
            }))
            .catch(err => dispatch({
                type: FAIL
            }))

        // setTimeout(() => {dispatch({
        //     type: GET_TREE_DATA + SUCCESS,
        //     payload: {treeData: testDateDjango }
        // })}, 1000)
    }
}

export function deleteTreeDataNode(rowInfo) {
    let {node: {id: nodeId}} = rowInfo;
    return (dispatch) => {
        dispatch({
            type: DELETE_TREE_DATA + START,
        });

        fetch(`/api/category/delete/?id=${nodeId}`, {
            method: 'DELETE',
            headers: jsonHeader
        }).then((res) => {
            dispatch({
                type: DELETE_TREE_DATA + SUCCESS,
                payload: {rowInfo}
            })
        }).catch(err => dispatch({
            type: FAIL
        }))

        // setTimeout(() => {dispatch({
        //     type: DELETE_TREE_DATA + SUCCESS,
        // 	payload: {rowInfo}
        // })}, 1000)
    }
}

export function addTreeDataNode(rowInfo) {
    return (dispatch) => {
        dispatch({
            type: ADD_TREE_DATA_NODE + START,
        });

        // fetch(`${HOSTNAME}/category/delete/?id=${nodeId}`, {
        //     method: 'DELETE'
        // }).then((res) => {
        //     dispatch({
        //         type: DELETE_TREE_DATA + SUCCESS,
        //         payload: {rowInfo}
        //     })
        // }).catch(err => dispatch({
        //     type: FAIL
        // }))

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
    return (dispatch) => {
        let {id: nodeId} = node;
        let parentId = null;

        if (!!nextParentNode) {
            parentId = nextParentNode.id;
        }

        dispatch({
            type: UPDATE_TREE_DATA + START,
        });

        fetch(`/api/category/move/?parentId=${parentId}&id=${nodeId}`, {
            method: 'DELETE',
            headers: jsonHeader
        })
            .then(res => res.json())
            .then((treeData) => {
            dispatch({
                type: DELETE_TREE_DATA + SUCCESS,
                payload: {treeData}
            })
        }).catch( err => dispatch({
            type: FAIL
        }))

        // setTimeout(() => {
        //     dispatch({
        //         type: UPDATE_TREE_DATA + SUCCESS,
        //         payload: {treeData}
        //     })
        // }, 1000)
    }
}
