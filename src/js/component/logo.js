/**
 * @file header
 * @auther Created by malin on 15/4/30.
 */
var React = require('react'),
    {Link, IndexLink} = require('react-router'),
    Button = require('./button');
let Logo = React.createClass({

    render() {
        let link = {
            display: 'block',
            width: '100%',
            height: '100%'
        };
        return (
            <div className="header">
                <div className="header-l">
                    <Link to={{pathname: 'nav'}}>
                        <Button tracking={{'lmt-track-id': 'header-l'}}></Button>
                    </Link>
                </div>
                <div className="logo">
                    <IndexLink to={{pathname: '/'}} style={link}>
                        <Button material-button tracking={{'lmt-track-id': 'logo'}}></Button>
                    </IndexLink>
                </div>
                <div className="header-r">
                    <Link to={{pathname: 'personal'}}>
                        <Button tracking={{'lmt-track-id': 'header-r'}}></Button>
                    </Link>
                </div>
            </div>

        );
    }
});
module.exports = Logo;