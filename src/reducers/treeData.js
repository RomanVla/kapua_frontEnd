/**
 * Created by cyxap on 29.7.18.
 */
import {
    UPDATE_TREE_DATA,
    DELETE_TREE_DATA,
    START,
    SUCCESS,
    GET_TREE_DATA,
    ADD_TREE_DATA_NODE,
    CHANGE_TREE_DATA
} from '../constants'

import {addNodeUnderParent, getNodeAtPath, removeNodeAtPath} from "react-sortable-tree";

let defaultState = {
    treeData: [],
    loading: false,
    loaded: false
};

export default function (dataTreeState = defaultState, action) {
    let {type, payload} = action;

    let {treeData} = dataTreeState;
    switch (type) {

        case GET_TREE_DATA + START:
            return {
                treeData: {},
                loading: true,
                loaded: false
            };

        case GET_TREE_DATA + SUCCESS:
            return {
                treeData: addTitle(payload.treeData),
                loading: false,
                loaded: true
            };

        case UPDATE_TREE_DATA:
        	console.log('from reducer update', payload.treeData )
            return {...dataTreeState,
                treeData: payload.treeData,
            };

		case UPDATE_TREE_DATA + START:
            return {
				...dataTreeState,
                loading: true,
                loaded: false
            };

        case UPDATE_TREE_DATA + SUCCESS:
        	console.log('actual tree data after update', addTitle(payload.treeData) )
            return{
                treeData: addTitle(payload.treeData),
                loading: false,
                loaded: true
            };

        // case UPDATE_TREE_DATA + START:
        //     return {...dataTreeState,
        //         loading: true,
        //         loaded: false};
		//
        // case UPDATE_TREE_DATA + SUCCESS:
        //     return {treeData: addTitle(payload.treeData),
        //         loading: false,
        //         loaded: true
        //     };

        case DELETE_TREE_DATA + START:
            return {...dataTreeState,
                loading: true,
                loaded: false };

        case DELETE_TREE_DATA + SUCCESS:
            return {treeData: removeNode(payload.rowInfo, treeData),
                loading: false,
                loaded: true}

        case ADD_TREE_DATA_NODE + START:
            return {...dataTreeState,
                loading: true,
                loaded: false };

        case ADD_TREE_DATA_NODE + SUCCESS:
            return {treeData: addNode(payload.rowInfo, treeData).treeData,
                loading: false,
                loaded: true}
    }
	return dataTreeState
}

function removeNode(rowInfo, treeData) {
    let {path} = rowInfo;

    return removeNodeAtPath({
        treeData: treeData,
        path: path,   // You can use path from here
        getNodeKey: ({node, treeIndex}) => {
            return treeIndex;
        },
        ignoreCollapsed: true,
    })
}

function addNode(rowInfo, treeData){
    let NEW_NODE = {title: 'Тест'};

    let {node, treeIndex, path} = rowInfo;
    let parentNode = getNodeAtPath({
        treeData: treeData,
        path : path,
        getNodeKey: ({ treeIndex }) =>  treeIndex,
        ignoreCollapsed : true
    });
    let getNodeKey = ({ node: object, treeIndex: number }) => {
        return number;
    };

    let parentKey = getNodeKey(parentNode);
    if(parentKey === -1) {
        parentKey = null;
    }

    return addNodeUnderParent({
        treeData: treeData,
        newNode: NEW_NODE,
        expandParent: true,
        parentKey: parentKey,
        getNodeKey: ({ treeIndex }) =>  treeIndex
    });
}

function addTitle(nodes){
    return nodes.map((node) => {
    	if (!node.data) return node;
        if (node.children) return {...node, title: node.data.name, children: addTitle(node.children) };
        return {...node, title: node.data.name}
    })
}