/**
 * Created by malin on 15/6/5.
 */
var React = require('react');

class BallChasing extends React.Component {
    render() {
        let loading = this.props.ballChasing;
        return (
        <div style={{display: loading ? 'block': 'none'}}>
            <div className="loading-center ball-chasing">
                <div className="loader">
                    <div  className="ball-1"></div>
                    <div  className="ball-2"></div>
                </div>
            </div>
        </div>
        );
    }
};
export default BallChasing;
