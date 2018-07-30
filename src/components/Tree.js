import React, { Component } from 'react';
import {connect} from 'react-redux'
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';

import {updateTreeData, deleteTreeDataNode, getTreeData, addTreeDataNode } from '../AC/treeData'

export class Tree extends Component {
    constructor(props) {
        super(props);
        this.deleteTreeDataNode = this.props.deleteTreeDataNode;
        this.addTreeDataNode = this.props.addTreeDataNode;
        this.updateTreeData = this.props.updateTreeData;
	}

    componentDidMount() {
		this.props.getTreeData()
	}

    getLoaderBody(){
        return (<div>Loading...</div>)
    }

    render() {
		let {treeData, loading, loaded} = this.props.treeDataState;

        let loader = this.getLoaderBody();
        console.log('from render', this.props)
		if (loading ) {
		    return loader
		}
        console.log()
		return (
            <div style={{ height: 400 }}>
                <SortableTree
                    treeData={treeData}
                    onChange={ treeData => {console.log('from on change', treeData); this.updateTreeData(treeData); }}
                    onMoveNode={ ({ treeData, node, nextParentNode}) => {this.updateTreeData({treeData, node, nextParentNode})}}
                    generateNodeProps={rowInfo => ({
                        buttons: [
                            <div >
                                <button label='Delete'
                                        onClick={(event) => {console.log(rowInfo);this.deleteTreeDataNode(rowInfo)}}>Remove</button>
                                <button label='Add'
                                        onClick={(event) =>  this.addTreeDataNode(rowInfo)}>Add</button>
                            </div>,
                        ],
                        style: {
                            height: '50px',
                        }
                    })}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	let {treeDataState} = state;
	return {treeDataState}
};

export default connect(mapStateToProps,
    {   updateTreeData,
        deleteTreeDataNode,
        getTreeData,
        addTreeDataNode,
    })(Tree)