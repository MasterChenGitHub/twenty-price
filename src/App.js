import React from 'react';
import './App.css';
import StockList from "./component/StockList";
import request from "superagent";
import Search from "./component/Search";
import is300 from "./util/Is300or688"

const defaultStockList = [
    {name: "完美世界", code: 'sz002624', price: 0, priceData: []},
    {name: "中金公司", code: 'sh601995', price: 0, priceData: []},
    {name: "招商银行", code: 'sh600036', price: 0, priceData: []},
    {name: "天山股份", code: 'sz000877', price: 0, priceData: []},
    {name: "歌尔股份", code: 'sz002241', price: 0, priceData: []},
    {name: "药明康德", code: 'sh603259', price: 0, priceData: []},
    {name: "大族激光", code: 'sz002008', price: 0, priceData: []},
    {name: "潍柴动力", code: 'sz000338', price: 0, priceData: []},
    {name: "口子窖", code: 'sh603589', price: 0, priceData: []},
    {name: "牧原股份", code: 'sz002714', price: 0, priceData: []},
    {name: "中国平安", code: 'sh601318', price: 0, priceData: []},
    {name: "格力电器", code: 'sz000651', price: 0, priceData: []},
    {name: "大丰实业", code: 'sh603081', price: 0, priceData: []},
    {name: "顺丰控股", code: 'sz002352', price: 0, priceData: []},
    {name: "海康威视", code: 'sz002415', price: 0, priceData: []},
    {name: "万科A", code: 'sz000002', price: 0, priceData: []},
    {name: "永辉超市", code: 'sh601933', price: 0, priceData: []},
    {name: "旗滨集团", code: 'sh601636', price: 0, priceData: []},
    {name: "科大讯飞", code: 'sz002230', price: 0, priceData: []},
    {name: "比亚迪", code: 'sz002594', price: 0, priceData: []},
    {name: "南京银行", code: 'sh601009', price: 0, priceData: []},
    {name: "顺鑫农业", code: 'sz000860', price: 0, priceData: []},
    {name: "中国国旅", code: 'sh601888', price: 0, priceData: []},
    {name: "古井贡酒", code: 'sz000596', price: 0, priceData: []},
]


function delElByIndex(arr, index) {
    for (var i = index, len = arr.length - 1; i < len; i++)
        arr[i] = arr[i + 1];

    arr.length = arr.length - 1;

}

class App extends React.PureComponent {


    state = {
        stockList: [],

        key: 1,
        searchList: []
    }

    componentDidMount() {


        // http://hq.sinajs.cn/list=sz002307,sh600928

        let stockData = localStorage.getItem('stocks')
        if (stockData === null) {
            stockData = defaultStockList
            localStorage.setItem('stocks', JSON.stringify(stockData))
            this.setState({stockList: defaultStockList})
        } else {
            this.setState({stockList: JSON.parse(stockData), key: 2})
        }

        setTimeout(() => {
            this.getLastClosePrices();
        }, 50);

    }


    getLastClosePrices() {
        let codes = ""
        this.state.stockList.map(item => codes += item.code + ",")
        codes = codes.slice(0, codes.length - 1);
        if (codes === "") return
        request
            .get('/list=' + codes)
            .set('Accept', 'application/json')
            .end((err, resp) => {
                if (!err) {
                    const stocks = resp.text.split(";");
                    let {stockList, key} = this.state;
                    stockList.forEach((item, index) => {
                        item.price = stocks[index].split(",")[2]
                        const is300Or68 = is300(item.code)
                        // let maxRange=10
                        // let factor = 0.01
                        const data = [];
                        if (is300Or68) {
                            for (let i = 0; i < 20; i += 2) {
                                data.push({
                                    key: `-${i === 0 ? (20 - i).toFixed(1) : (20 - i).toFixed(2)}%`,
                                    value: (item.price * (0.01 * i + 0.8)).toFixed(2)
                                });
                            }

                            for (let i = 2; i <= 20; i += 2) {
                                data.push({
                                    key: `+${i === 20 ? i.toFixed(1) : i.toFixed(2)}%`,
                                    value: (item.price * (0.01 * i + 1)).toFixed(2)
                                });
                            }
                        } else {
                            for (let i = 0; i < 10; i++) {
                                data.push({
                                    key: `-${i === 0 ? (10 - i).toFixed(1) : (10 - i).toFixed(2)}%`,
                                    value: (item.price * (0.01 * i + 0.9)).toFixed(2)
                                });
                            }

                            for (let i = 1; i <= 10; i++) {
                                data.push({
                                    key: `+${i === 10 ? i.toFixed(1) : i.toFixed(2)}%`,
                                    value: (item.price * (0.01 * i + 1)).toFixed(2)
                                });
                            }

                        }

                        item.priceData = data;
                    })
                    this.setState({stockList, key: key + 1})

                }
            })
    }

    handleSearch = (param) => {
        request
            .get('/stock/optionalStock')
            .set('Accept', 'application/json')
            .query(`stock=${param}`)
            .end((err, resp) => {
                if (!err) {
                    const data = JSON.parse(resp.text).data
                    this.setState({searchList: data})
                } else {
                    this.setState({searchList: []});
                }
            })
    }

    clearSearchList = () => {
        this.setState({searchList: []})
    }

    handleSelect = (index) => {
        const {stockList, searchList} = this.state;
        const target = searchList[index];
        for (let t of stockList) {
            if (t.code === target.code) {
                this.setState({searchList: []});
                return;
            }
        }
        stockList.unshift(target);
        this.setState({searchList: [], stockList});
        localStorage.setItem('stocks', JSON.stringify(stockList))
        //refresh data
        setTimeout(() => {
            this.getLastClosePrices();
        }, 50);

    }

    handleDelete = (index) => {
        const {stockList} = this.state;
        // stockList.splice(index, 1);
        delElByIndex(stockList, index);
        this.setState({stockList: [...stockList]});
        localStorage.setItem('stocks', JSON.stringify([...stockList]))
        //refresh data
        setTimeout(() => {
            this.getLastClosePrices();
        }, 50);

    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div> 股票挂单价格助手</div>
                    <Search handleSearch={this.handleSearch} searchList={this.state.searchList}
                            clearSearchList={this.clearSearchList} handleSelect={this.handleSelect}/>
                </header>
                <StockList key={this.state.key} data={this.state.stockList} handleDelete={this.handleDelete}/>
            </div>
        );
    }
}

export default App;
