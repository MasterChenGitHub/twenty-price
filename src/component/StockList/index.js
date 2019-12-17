import React from 'react';
import './index.css'
import request from 'superagent'

class StockList extends React.PureComponent {

    state = {
        list: [
            {name: "云南白药", code: 'sz000538', price: 0},
            {name: "口子窖", code: 'sh603589', price: 0},
            {name: "牧原股份", code: 'sz002714', price: 0},
            {name: "中国平安", code: 'sh601318', price: 0},
            {name: "格力电器", code: 'sz000651', price: 0},
            {name: "大丰实业", code: 'sh603081', price: 0},
            {name: "顺丰控股", code: 'sz002352', price: 0},
            {name: "海康威视", code: 'sz002415', price: 0},
            {name: "万科A", code: 'sz000002', price: 0},
            {name: "永辉超市", code: 'sh601933', price: 0},
            {name: "旗滨集团", code: 'sh601636', price: 0},
            {name: "科大讯飞", code: 'sz002230', price: 0},
            {name: "比亚迪", code: 'sz002594', price: 0},
            {name: "南京银行", code: 'sh601009', price: 0},
            {name: "顺鑫农业", code: 'sz000860', price: 0},
            {name: "中国国旅", code: 'sh601888', price: 0},
            {name: "古井贡酒", code: 'sz000596', price: 0},
        ]
    }


    componentDidMount() {
        // http://hq.sinajs.cn/list=sz002307,sh600928
        let codes = ""
        this.state.list.map(item => codes += item.code + ",")
        codes = codes.slice(0, codes.length - 1);
        request
            .get('/list=' + codes)
            .set('Accept', 'application/json')
            .end((err, resp) => {
                if (!err) {
                    const stocks = resp.text.split(";");
                    let {list} = this.state;
                    list.forEach((item, index) => {
                        item.price = stocks[index].split(",")[2]
                    })
                    this.setState(list)
                }
            })
    }

    renderList = () => {
        return this.state.list.map(item => {
            const {name, code, price} = item;
            const data = [];
            for (let i = 0; i < 10; i++) {
                data.push({
                    key: `-${i === 0 ? (10 - i).toFixed(1) : (10 - i).toFixed(2)}%`,
                    value: (price * (0.01 * i + 0.9)).toFixed(2)
                });
            }

            for (let i = 1; i <= 10; i++) {
                data.push({
                    key: `+${i === 10 ? i.toFixed(1) : i.toFixed(2)}%`,
                    value: (price * (0.01 * i + 1)).toFixed(2)
                });
            }
            return <div className="list-item" key={code}>{name + code}

                {data.map((c, i) => (
                    <div key={`${c.key}_${i}`}>
                        <div className="price-item">
                            <div style={{color: i < 10 ? 'green' : 'red'}}>{c.key + "--" + c.value}</div>
                            <div/>
                            {/*<div  style={{color:i<10?'green':'red'}} >{c.value}</div>*/}
                        </div>
                    </div>
                ))}
            </div>
        })
    }

    render() {
        return (<div className="list-container">
            {this.renderList()}
        </div>)
    }
}

export default StockList