/**
 * Created by malin on 15/5/14.
 */
var formCheck = function (self) {
    var ref = self.refs;
    var hasError = 0;
    for (let i of Object.keys(ref)) {
        if (ref[i].refs && ref[i].refs.validate) {
            if (ref[i].refs.validate.toValidate) {
                hasError += ref[i].refs.validate.toValidate(
                    ref[i].refs.validate.refs.validate.value,
                    ref[i].props.validate
                );
            }
        }
    }

    if ($('select[name="purpose_id"]').val() === '55') {
        hasError += self.refs.purpose_id.refs.validateTwo.refs.validate.props.toValidate(
            self.refs.purpose_id.refs.validateTwo.refs.validate.value,
            self.refs.purpose_id.refs.validateTwo.props.validate
        );
    }
    if (self.refs.agree) {
        hasError += self.refs.agree.toValidate(
            self.refs.agree.refs.validate.checked,
            self.refs.agree.props.validate
        );
    }

    return hasError === 0;
};
module.exports = formCheck;
