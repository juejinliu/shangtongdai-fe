/**
 * Created by malin on 15/6/5.
 */
var React = require('react');

let Css3Loading = React.createClass({
    render() {
        var loading = this.props.loading;
        return (
        <div className="css3-loading" style={loading? {display: 'block'}:{display: 'none'}}>
            <div className="loading-center">
                <div className="loading-center-absolute">
                    <div  className="object_one object"></div>
                    <div  className="object_two object"></div>
                    <div  className="object_three object"></div>
                </div>
            </div>
        </div>
        );
    }
});
module.exports = Css3Loading;