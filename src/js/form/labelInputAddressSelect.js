/**
 * Created by malin on 15/5/4.
 */
var React = require('react'),
    formValidator = require('./formValidator'),
    AppData = require('./../component/appData'),
    Event = require('./../lib/trigger'),
    $ = require('./../lib/zepto.js');

const {stdApi} = AppData.api();

const [provinceApi, citiesApi, countiesApi] = [
    stdApi.provinceApi,
    stdApi.citiesApi,
    stdApi.countiesApi];

let SelectCity = React.createClass({
    handleChange(value) {
        this.props.onChange && this.props.onChange(value);
    },

    render() {
        let styleDiv = {
            float: 'left',
            width: '100%',
            height: '34px',
            marginBottom: '10px'

        };
        let styleSelect = {
            width: '100%',
            verticalAlign: 'text-top'
        };
        let selectCityNode = this.props.cities.map(function (address) {
            return (
                <option value={address.id} key={address.id}>
                            {address.name}
                </option>
            );
        });
        return (
            <div style={styleDiv}>
                <select style={styleSelect} name="city_id" ref="city" data-name="city_id" value={this.props.value2} onChange={this.handleChange}>
                {selectCityNode}
                </select>
            </div>
        );
    }
});

let SelectProvince = React.createClass({
    handleChange(value) {
        this.props.onChange && this.props.onChange(value);
    },

    render() {
        let styleDiv = {
            float: 'left',
            width: '100%',
            height: '34px',
            marginBottom: '10px'

        };
        let styleSelect = {
            width: '100%',
            verticalAlign: 'text-top'
        };
        let selectProvinceNode = this.props.provinces.map(function (address) {
            return (
                <option value={address.id}  key={address.id}>
                            {address.name}
                </option>
            );
        });
        return (
            <div style={styleDiv}>
                <select style={styleSelect} name="province_id" ref="province" data-name="province_id" value={this.props.value1} onChange={this.handleChange}>
                {selectProvinceNode}
                </select>
            </div>
        );
    }
});

let SelectCounty = React.createClass({
    handleChange(value) {
        this.props.onChange && this.props.onChange(value);
    },

    render() {
        let styleDiv = {
            float: 'left',
            width: '100%',
            height: '34px',
            marginBottom: '10px'

        };
        let styleSelect = {
            width: '100%',
            verticalAlign: 'text-top'
        };
        let selectCountyNode = this.props.countries.map(function (address) {
            return (
                <option value={address.id}  key={address.id}>
                            {address.name}
                </option>
            );
        });
        return (
            <div style={styleDiv}>
                <select style={styleSelect} name="county_id" ref="county" data-name="county_id" value={this.props.value3} onChange={this.handleChange}>
                    {selectCountyNode}
                </select>
            </div>
        );
    }
});


let LabelInputAddressSelect = React.createClass({
    getInitialState() {
        return {
            province: [],
            city: [],
            county: [],
            value1: '',
            value2: '',
            value3: ''
        };
    },

    _loadProvinceData() {
        let self = this;
        $.ajax({
                'url': provinceApi,
                'type': 'get',
                'dataType': 'jsonp',
                'jsonp': 'callback',
                'data': {'token': '', _: (new Date).getTime()},
                success: function (json) {
                    if (json) {
                        let provinces = json;
                        self.setState({province: provinces});
                        if (self.props.value1 && !self.state.value1) {
                            self.setState({value1: self.props.value1});
                            self._loadCityData(self.props.value1);

                        } else {
                            self._loadCityData(provinces[0].id);

                        }
                    }
                }
            }
        );
    },

    _loadCityData: function (senddata) {
        let self = this;
        $.ajax({
                'url': citiesApi + '/' + senddata,
                'type': 'get',
                'dataType': 'jsonp',
                'jsonp': 'callback',
                'data': {'token': '', _: (new Date).getTime()},
                success: function (json) {
                    if (json) {
                        let citys = json;
                        self.setState({city: citys});
                        if (self.props.value2 && !self.state.value2) {
                            self.setState({value2: self.props.value2});
                            self._loadCountyData(self.props.value2);

                        } else {
                            self._loadCountyData(citys[0].id);
                        }
                    }
                }
            }
        );

    },

    _loadCountyData: function (senddata) {
        let self = this;
        $.ajax({
                'url': countiesApi + '/' + senddata,
                'type': 'get',
                'dataType': 'jsonp',
                'jsonp': 'callback',
                'data': {'token': '', _: (new Date).getTime()},
                success(json) {
                    if (json) {
                        self.setState({county: json});
                        if (self.props.value3 && !self.state.value3) {
                            self.setState({value3: self.props.value3});
                        }
                    }
                }
            }
        );
    },

    componentDidMount: function () {
        this._loadProvinceData();
    },

    onProvinceChange: function (province) {
        this.setState({value1: event.target.value});
        this._loadCityData(province.target.value);
    },

    onCityChange: function (city) {
        this.setState({value2: event.target.value});

        this._loadCountyData(city.target.value);
    },

    onCountyChange: function (event, value) {
        this.setState({value3: event.target.value});
        this.toValidate(event, value);
    },
    toValidate: function (event, value) {
        let self = this;
        let validate = this.props.validate;
        let hasError = 0;
        if (value) {
            validate = value;
        }
        for (let i of Object.keys(validate)) {
            if (formValidator[i]($('select[name="county_id"]').val()) === false) {
                self.setState({error: validate[i]});
                hasError += 1;
            } else {
                self.setState({error: ''});
            }
        }
        return hasError;
    },
    render: function () {
        let styleDiv = {
            width: '67%',
            float: 'left'
        };
        let styleEm = {
            color: 'rgb(239, 120, 138)',
            fontSize: '12px',
            lineHeight: '2em',
            float: 'left',
            width: '100%'
        };
        return (
            <div className="address" style={styleDiv}>
                <SelectProvince provinces={this.state.province} onChange={this.onProvinceChange} value1={this.state.value1}></SelectProvince>
                <SelectCity cities={this.state.city} onChange={this.onCityChange} value2={this.state.value2}></SelectCity>
                <SelectCounty
                    countries={this.state.county}
                    onChange={this.onCountyChange}
                    value3={this.state.value3}
                    toValidate={this.toValidate}
                    validate={this.props.validate}
                    name={this.props.name}
                    data-name={this.props['data-name']}
                    ref="validate"
                    ></SelectCounty>
                <em style={styleEm}>{this.state.error}</em>
            </div>
        );
    }

});
module.exports = LabelInputAddressSelect;
