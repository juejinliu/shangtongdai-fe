/**
 * Created by malin on 15/5/4.
 */
var React = require('react'),
    Tracking = require('./../lib/tracking'),
    AppData = require('./../component/appData'),
    MobilePlatform = require('./../lib/mobilePlatform'),
    formValidator = require('./formValidator');

const {stdApi, stdUserStatus} = AppData.api();
const [uploadApi, uploadWechatApi, {isWechatUa}] = [stdApi.uploadApi, stdApi.uploadWechatApi, MobilePlatform];

let UploadState = React.createClass({
    render() {
        return (
            <p style={this.props.style}>{this.props.isSuccess}</p>
        );
    }
});

let hasGetPicture = () => {
    return (window.stdGetPicture && 'function' === (typeof window.stdGetPicture));
};

// http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
/**
 * Detecting vertical squash in loaded image.
 * Fixes a bug which squash image vertically while drawing into canvas for some images.
 * This is a bug in iOS6 devices. This function from https://github.com/stomita/ios-imagefile-megapixel
 *
 */
let detectVerticalSquash = function detectVerticalSquash(img) {
    //let iw = img.naturalWidth;
    let ih = img.naturalHeight;
    let canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = ih;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    let data = ctx.getImageData(0, 0, 1, ih).data;
    // search image edge pixel position in case it is squashed vertically.
    let sy = 0;
    let ey = ih;
    let py = ih;
    while (py > sy) {
        let alpha = data[(py - 1) * 4 + 3];
        if (alpha === 0) {
            ey = py;
        } else {
            sy = py;
        }
        py = (ey + sy) >> 1;
    }
    let ratio = (py / ih);
    return (ratio === 0) ? 1 : ratio;
};

/**
 * A replacement for context.drawImage
 * (args are for source and destination).
 */
let drawImageIOSFix = function drawImageIOSFix(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
    let vertSquashRatio = detectVerticalSquash(img);
    // Works only if whole image is displayed:
    // ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
    // The following works correct also when only a part of the image is displayed:
    ctx.drawImage(img, sx * vertSquashRatio, sy * vertSquashRatio,
        sw * vertSquashRatio, sh * vertSquashRatio,
        dx, dy, dw, dh);
};

let LabelInputFile = React.createClass({
    getInitialState() {
        return {
            upload: '未上传',
            error: ''

        };
    },

    componentDidMount() {
        let text = '未上传';
        if (this.refs.validate.value === '') {

        } else {
            text = '上传成功';
            this.setState({error: ''});

        }
        this.setState({upload: text});
    },

    toValidate(event, value) {
        let self = this;
        let validate = this.props.validate;
        let hasError = 0;
        if (value) {
            validate = value;
        }
        for (let i of Object.keys(validate)) {
            if (formValidator[i](event.target ? event.target.value : event) === false) {
                self.setState({error: validate[i]});
                hasError += 1;
            } else {
                self.setState({error: ''});
            }
        }
        return hasError;

    },

    _fileUpLoad(e, d) {
        let self = this;
        Tracking.trackEvent('uploadstart', {'target': 'mobile-photo', 'file_size': (d.image || '').length});
        $.ajax({
            'url': uploadApi,
            'type': 'post',
            'dataType': 'json',
            'data': d,
            success: function (json) {
                if (json.result === 'success') {
                    self.refs.file.disabled = false;
                    self.setState({upload: '上传成功'});
                    self.setState({error: ''});
                    self.refs.validate.value = json.results.id;
                    Tracking.trackEvent('uploadsuccess', {
                        'target': 'mobile-photo',
                        'file_size': (d.image || '').length
                    });
                } else {
                    Tracking.trackEvent('error', {
                        'reason': JSON.stringify(json),
                        'target': 'mobile-photo',
                        'file_size': (d.image || '').length
                    });
                    self.setState({upload: '上传失败'});
                    self.refs.file.disabled = false;
                    self.refs.validate.value = '';
                }
            },
            error: function (xhr, status, error) {
                Tracking.trackEvent('error', {
                    'reason': 'status: ' + status + ', error: ' + error,
                    'target': 'mobile-photo',
                    'file_size': (d.image || '').length
                });
                self.setState({upload: '上传失败'});
                self.refs.file.disabled = false;
                self.refs.validate.value = '';

            }
        });
        if (e) {
            e.preventDefault();
        }
    },

    _resizeAndUpload: function (e, data, maxH = 600) {
        let self = this;
        self.base64 = data;
        self.setState({upload: '上传中'});
        self.refs.file.disabled = true;
        let $canvas = $('<canvas />');
        let $img = new Image();
        let width, height, newWidth, newHeight;
        let proportion;
        let maxHeight = maxH;
        Tracking.trackEvent('uploadresize', {
            'target': 'mobile-photo',
            'file_size': (data || '').length,
            'maxHeight': maxHeight
        });
        $img.onload = function () {
            newWidth = width = $img.width;
            newHeight = height = $img.height;
            proportion = width / height;
            if (height > maxHeight) {
                newWidth = proportion * maxHeight;
                newHeight = maxHeight;
            }
            $canvas[0].width = newWidth;
            $canvas[0].height = newHeight;
            let ctx = $canvas[0].getContext('2d');
            drawImageIOSFix(ctx, $img, 0, 0, width, height, 0, 0, newWidth, newHeight);

            let base64 = $canvas[0].toDataURL('image/jpeg', 0.8);
            if (base64.length > 1024 * 256 && maxHeight > 300) {
                // 300 is the bottom line
                let h = maxHeight - 100;
                if (h < 300) {
                    h = 300;
                }
                self._resizeAndUpload(e, data, h);
            } else {
                self._fileUpLoad(e, {image: base64, _: (new Date).getTime()});
            }

        };

        $img.src = self.base64;
    },

    _showPreview() {
        if (hasGetPicture()) {
            return false;
        }
        let file = this.refs.file.files[0];
        let self = this;
        if (window.FileReader) {
            let fr = new FileReader();
            fr.onloadend = function (e) {
                self._resizeAndUpload(e, e.target.result);
            };
            fr.readAsDataURL(file);
        } else {
            Tracking.trackEvent('error', {'reason': 'FileReader not supported', 'target': 'mobile-photo'});
        }
    },

    uploadByWechatApi(e) {
        let self = this;
        if (hasGetPicture()) {
            window.stdGetPicture(function (result) {
                if (result.code === 0) {
                    let data = 'data:' + result.MIME + ';base64,' + result.data;
                    self._resizeAndUpload(e, data);
                }
            });
        } else {
            return true;
        }

        return false;
    },

    _selectPictureWx: function (e) {
        var self = this,
            localIds;
        wx.chooseImage({
            count: 1,
            success (res) {
                localIds = res.localIds[0];
                self._uploadFileWx(localIds);
                Tracking.trackEvent('selectPicSuccess', {'target': 'wx-mobile-photo'});
            },
            fail () {
                self.setState({upload: '上传失败'});
                Tracking.trackEvent('selectPicFail', {'target': 'wx-mobile-photo'});
            }
        });
    },

    _uploadServerId: function (serverId) {
        var self = this,
            url = uploadWechatApi + '?media_id=' + serverId;
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'jsonp',
            jsonp: 'callback',
            success(json) {
                if (json.result === 'success') {
                    self.setState({upload: '上传成功'});
                    self.setState({error: ''});
                    self.refs.validate.value = json.results.id;
                    Tracking.trackEvent('uploadsuccess', {'target': 'wx-mobile-photo'});
                } else {
                    Tracking.trackEvent('error', {'reason': JSON.stringify(json), 'target': 'wx-mobile-photo'});
                    self.setState({upload: '上传失败'});
                    self.refs.validate.value = '';
                }
            },
            'error'() {
                self.setState({upload: '上传失败'});
                self.refs.validate.value = '';
            }
        });
    },

    _uploadFileWx: function (localId) {
        var serverId,
            self = this;
        this.setState({upload: '上传中'});
        wx.uploadImage({
            localId: localId,
            success(res) {
                serverId = res.serverId;
                self._uploadServerId(serverId);
                Tracking.trackEvent('uploadWechatSuccess', {'target': 'wx-mobile-photo'});
            },
            fail(res) {
                self.setState({upload: '上传失败'});
                Tracking.trackEvent('uploadWechatFail', {'target': 'wx-mobile-photo'});
            }
        });
    },

    render() {
        let textstyle;
        let styleLabel = {
            fontSize: '13px',
            marginTop: '10px',
            float: 'left',
            width: '71%'

        };
        let styleSpan = {
            fontSize: '14px',
            color: '#159ed0',
            float: 'left',
            width: '50%'
        };
        let styleHideInput = {
            visibility: 'hidden',
            width: '10%',
            float: 'left'
        };
        let styleEm = {
            color: 'rgb(239, 120, 138)',
            fontSize: '12px',
            lineHeight: '2em',
            float: 'left'
        };
        let styleCanvas = {
            position: 'absolute',
            display: 'none'
        };
        if (this.state.upload === '未上传') {
            textstyle = {color: '#ccc', paddingRight: '3%', float: 'left', width: '40%', textAlign: 'right'};
        } else {
            textstyle = {color: '#03B549', paddingRight: '3%', float: 'left', width: '40%', textAlign: 'right'};

        }
        return (
            <label className="pic-upload" style={styleLabel}>
                {
                    (isWechatUa) ?
                        <span style={styleSpan} onClick={this._selectPictureWx}>请选择照片</span>
                        :
                        <div>
                            <span style={styleSpan}>请选择照片</span>
                            <input style={styleHideInput} type="file" capture="camera" accept="image/*" ref="file"
                                   onClick={this._selectPicture} onChange={this._showPreview}/>
                        </div>
                }
                <UploadState style={textstyle} isSuccess={this.state.upload}></UploadState>
                <canvas style={styleCanvas}></canvas>
                <input type="hidden"
                       ref="validate"
                       toValidate={this.toValidate}
                       onChange={this.toValidate}
                       validate={this.props.validate}
                       name={this.props.name}
                       defaultValue={this.props.defaultValue}
                       data-name={this.props['data-name']}/>
                <em style={styleEm}>{this.state.error}</em>

            </label>

        );
    }

});
module.exports = LabelInputFile;
