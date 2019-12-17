import React from 'react';
import StockList from "../StockList/index";
import './index.css';

class TwentyPrice extends React.PureComponent {

    render() {
        return (<div className="container">
            <StockList/>
        </div>);
    }

}

export default TwentyPrice;
