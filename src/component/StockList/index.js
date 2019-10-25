import React from 'react';
import './index.css'

class StockList extends React.PureComponent {

    state = {
        index: 0,
        list: ['601318', '600926']
    }

    renderList = () => {
        // const {list}=this.state
        // console.log(list)
        return this.state.list.map(item => {
            return <div className="item">{item}</div>
        })
    }

    render() {
        return (<div className="list-container">
            <div className="title"> list</div>

            <div>   {this.renderList()}</div>
        </div>)
    }
}

export default StockList