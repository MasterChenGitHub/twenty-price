import React from 'react';
import StockList from "../StockList/index";
import './index.css';
import StockPrice from "../StockPrice";

class TwentyPrice extends React.PureComponent {

    render() {
        return (<div className="container">
            <StockList/>
            {/*<StockPrice/>*/}
        </div>);
    }

}

export default TwentyPrice;