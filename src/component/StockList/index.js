import React from 'react';
import './index.css'
import ic_del from '../../delete.svg'

class StockList extends React.PureComponent {

    state = {
        list: [],
        index: 0
    }

    componentDidMount() {
        this.setState({
            list: this.props.data
        })
    }

    renderList = () => {
        const that = this;
        return this.state.list.map((item, index) => {
            const {name, code} = item;
            const selected = index === that.state.index;
            return <div className="list-item" key={index}
                        style={{
                            backgroundColor: selected ? 'rgb(32,63,133)' : 'rgb(21,34,69)',
                            color: selected ? 'white' : '#fefefe'
                        }}

                        onClick={() => {
                            that.setState({index: index})
                        }}
            >{`${name}(${code})`}
             <img src={ic_del} className="del-icon" onClick={(e) => {
                    this.props.handleDelete(index)
                }} alt="del"/>

            </div>
        })
    }

    renderPrices = () => {
        const data = this.state.list[this.state.index].priceData;
        if (data === undefined || data.length === 0) return (<div> no price</div>)
        return data.map((c, i) => (
            <div key={`${c.key}_${i}`} className="price-item">
                <div style={{color: i < 10 ? 'green' : 'red'}}>{`${c.value}(${c.key})`}</div>
            </div>
        ))

    }

    render() {
        if (this.state.list.length !== 0) {
            return (<div className="main-container">
                <div className="list-container">
                    {this.renderList()}
                </div>
                <div className="v-line"/>
                <div className="list-price-container">
                    {this.renderPrices()}
                </div>
            </div>)
        } else {
            return <div> no data</div>
        }
    }
}

export default StockList
