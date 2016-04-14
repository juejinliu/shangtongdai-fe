/**
 * Created by malin on 15/5/13.
 */

var React = require('react'),
    $ = require('./../lib/zepto'),
    Button = require('./button');

let Customer = React.createClass({
    getInitialState() {
        return {
            height: false
        };
    },

    setPosition() {
        if ($('.fullpageHeight').length) {
            $('#custorm').removeClass('bottom');
        } else {
            if ($(window).height() > $(document).height() + 84) {
                $('#custorm').addClass('bottom');
            } else {
                $('#custorm').removeClass('bottom');
            }
        }

    },

    componentDidMount() {
        this.setPosition();
    },

    componentDidUpdate() {
        this.setPosition();
    },

    render() {
        let stylePLink = {
            margin: '10px auto 20px',
            width: '100px',
            display: 'block',
            color: 'rgb(82, 82, 245)'
        };
        return (
            <div id="custorm" className="customer">
                商通贷客服电话：
                <a href="tel:4008181868">
                    <Button
                        text="4008-1818-68 "
                        tracking
                        ></Button>
                </a>
                (周一至周日 9:30-18:30)
                <p>
                    <a style={stylePLink} href="https://shangdai.yixin.com">
                        <Button
                            text="跳转到电脑版"
                            tracking
                            ></Button>
                    </a>
                </p>
            </div>
        );
    }
});
module.exports = Customer;
