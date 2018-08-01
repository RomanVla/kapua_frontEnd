import React, { Component } from 'react';
import {connect} from 'react-redux'
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';

import {updateTreeData, deleteTreeDataNode, getTreeData, addTreeDataNode } from '../AC/treeData'
import {SearchingNodeForm} from "./SearchingForm";

export class Tree extends Component {
    constructor(props) {
        super(props);
        this.deleteTreeDataNode = this.props.deleteTreeDataNode;
        this.addTreeDataNode = this.props.addTreeDataNode;
        this.updateTreeData = this.props.updateTreeData;

        this.state = {
            searchingString: "",
            nodeMatchesCount: 0,
            searchFocusOffset: 0
        }
	}

    componentDidMount() {
		this.props.getTreeData()
	}

    render() {
		let {treeData} = this.props.treeDataState;

		return (
            <div style={{ height: 400 }}>

                <SearchingNodeForm nodeMatchesCount={this.state.nodeMatchesCount}
                                   searchFocusOffset={this.state.searchFocusOffset}
                                   searchingString={this.state.searchingString}
                                   updateSearchingString={this.updateSearchingString}
                                   changeOffset={this.changeOffset}/>

                    {this.getLoaderBody()}
                    {this.getErrorBody()}


                <SortableTree
                    treeData={treeData}
                    onChange={ treeData => this.updateTreeData(treeData)}
                    onMoveNode={ ({ treeData, node, nextParentNode}) => {this.updateTreeData({treeData, node, nextParentNode})}}
                    searchQuery={this.state.searchingString}
                    searchFinishCallback={ (matches) => {
                        this.calculateMatches(matches)
                        }
                    }
                    searchFocusOffset={this.state.searchFocusOffset}
                    generateNodeProps={rowInfo => ({
                        buttons: [
                            <div >
                                <button label='Delete'
                                        onClick={(event) => this.deleteTreeDataNode(rowInfo)}>Remove</button>
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

    getLoaderBody(){
        let {loading} = this.props.treeDataState;
        if(loading)return (<div>Processing...</div>)
    }

    getErrorBody(){
        let {loaded, loading} = this.props.treeDataState;
        if(!loaded && !loading) {
            this.props.getTreeData();
            return(<div>Error..Receiving actual data</div>)}
    }

    updateSearchingString = (searchingString) => {
        this.setState({searchingString,
            searchFocusOffset: 0
        })
    };

    calculateMatches = (matches) => {
        this.setState({
            nodeMatchesCount: matches.length
        })
    };

    changeOffset = ({changeOn: offset}) => {
        let searchFocusOffset = this.restrictionForOffset(offset);

        this.setState((prevState, props) => {
            return {
                searchFocusOffset: searchFocusOffset
            }
        })
    };

    restrictionForOffset = (offset) => {
        let searchFocusOffset = this.state.searchFocusOffset;

        if (this.state.nodeMatchesCount === 0) {
            searchFocusOffset = 0
        } else if (this.state.searchFocusOffset + offset >= this.state.nodeMatchesCount) {
            searchFocusOffset = 0
        } else if (this.state.searchFocusOffset + offset < 0) {
            searchFocusOffset = this.state.nodeMatchesCount - 1
        } else {
            searchFocusOffset += offset
        }
        return searchFocusOffset;
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