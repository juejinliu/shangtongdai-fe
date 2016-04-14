/**
 * @file
 * @auther Created by malin on 16/1/9.
 */
import React from 'react';
class TermiteCancel extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        class: React.PropTypes.string
    };
    static defaultProps = {
        class: 'termite-loading'
    };
    defaultDiv = () => {
        return <div className={this.props.class}>
            <img src="https://shangdai.yixin.com/imgs/estimate-loading.gif"/>
            <br />
            <br />

            <div className="center-text">分析中...</div>
            <br />
            <br />
        </div>;

    };

    render() {
        return (
            <div>
                {
                    this.props.children || this.defaultDiv()
                }
            </div>
        );
    }
}
export default TermiteCancel;
