import React from 'react';
import './index.css';

class Search extends React.PureComponent {

    state = {
        value: '',
        active: 0
    }


    handleChange = e => {
        const value = e.target.value;
        this.setState({value, active: 0}, () => {
            // this.list.scrollTop = 0;
            if (!value) {
                this.props.clearSearchList();
            } else {
                this.props.handleSearch(value);
            }
        });
    }

    handleSelect = index => {
        this.setState({value: ''});
        this.props.handleSelect(index)
    }

    render() {
        const {searchList} = this.props;
        const {value} = this.state;
        return (<div>
            <div className="search-input-container">
                <input className="search-input" type="text" value={value} placeholder={'输入股票代码/股票首字母'}
                       onChange={this.handleChange}/>

                {/*<img className="search-icon" alt="search" src={searchIcon}/>*/}

            </div>

            <div className="search-list" ref={ref => this.list = ref}>
                {searchList.map((v, i) => {
                    const {name} = v;
                    return (
                        <div
                            className="item"
                            key={i}
                            onClick={() => this.handleSelect(i)}
                        >
                            {name}
                        </div>
                    );
                })}
            </div>

        </div>)

    }
}

export default Search
