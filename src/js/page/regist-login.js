/**
 * Created by malin on 15/5/28.
 */
var React = require('react'),
    message = require('../messageConfig'),
    Regist = require('./regist'),
    Login = require('./login'),
    Customer = require('./../component/customer'),
    Logo = require('./../component/logo'),
    GetPassword = require('./getPassword'),
    NavChange = require('./../component/navChange');

let RegLogin = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getDefaultProps() {
        return {
            params: {tab: 'login'},
            query: {next: ''}
        };
    },

    getInitialState() {
        return {
            active: '',
            next: ''
        };
    },

    componentDidMount() {
        let active = message.registLogin.navNewPerson;
        if (this.props.params.tab === 'login') {
            active = message.registLogin.navOldPerson;
        } else if (this.props.params.tab === 'getPassword') {
            active = message.registLogin.navOldPerson;
        }
        this.setState({
            active: active,
            next: this.props.location.query.next
        });
    },

    _changeType(e){
        let active = e.target.innerText;
        if (active === message.registLogin.navOldPerson) {
            this.context.router.push('reg-login/login', {next: this.state.next});
        } else {
            this.context.router.push('reg-login/regist', {next: this.state.next});
        }
        this.setState({
            active: active
        });
    },

    render: function () {
        return (
            <div>
                <Logo />
                <NavChange onClick={this._changeType} text1={message.registLogin.navNewPerson}
                           text2={message.registLogin.navOldPerson}
                           active={this.state.active}></NavChange>
                {
                    this.props.params.tab === 'regist' ?
                        <Regist next={this.state.next}></Regist> :
                        this.props.params.tab === 'getPassword' ?
                            <GetPassword next={this.state.next}></GetPassword> :
                            <Login next={this.state.next}></Login>
                }
                <Customer></Customer>
            </div>
        );
    }
});


module.exports = RegLogin;
