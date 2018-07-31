import React, {Component} from 'react';

export class SearchingNodeForm extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.updateSearchingString = this.props.updateSearchingString;

        this.changeOffset = this.props.changeOffset;
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <input type="text" value={this.props.searchingString} onChange={ev => this.updateSearchingString(ev.target.value)}/>
                <button type="button" onClick={() => this.changeOffset({changeOn: -1})}>Previous node</button>
                <button type="button" onClick={() => this.changeOffset({changeOn: 1})}> Next node</button>
                <div>{this.props.nodeMatchesCount === 0 ? this.props.searchFocusOffset : this.props.searchFocusOffset + 1}/{this.props.nodeMatchesCount}</div>
            </div>
        )
    }
}
