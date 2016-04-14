/**
 * Created by malin on 15/5/14.
 */
var mobileCheck = function (self, v) {
    let vRef = self.refs[v].refs.validate;
    let vErrors = 0;
    if (vRef) {
        vErrors = vRef.toValidate(
            vRef.refs.validate.value,
            self.refs[v].props.validate);
    }

    return vErrors <= 0;
};
module.exports = mobileCheck;
