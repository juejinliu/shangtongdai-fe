/**
 * @file
 * @auther Created by malin on 16/1/10.
 */
class Sudoku {
    constructor() {
        this.num = 0;
        this.circle = 0;
        this.speed = 300;
        this.t = 0;
        this.len = 0;
        this.prizeNum = '';
    };

    stop(prizeNum, father) {
        this.prizeNum = prizeNum;
        this.father = father;
    };

    lightChange($prizes, changeClass, prizeArr) {
        this.len = $prizes.length;
        $prizes.removeClass(changeClass);
        $prizes.eq(prizeArr[this.num]).addClass(changeClass);
        if (this.num === this.len - 1) {
            this.num = 0;
            this.circle++;
        } else {
            this.num++;
        }
        if (this.circle >= 3 && this.num === ((this.prizeNum === 7) ? -1 : this.prizeNum) + 1) {
            this.circle = 0;
            this.father && this.father.setState({
                processing: false
            });
            clearTimeout(this.t);
        } else {
            if (this.num === 5) {
                this.speed = 100;
            } else if (this.circle >= 3 && this.num !== this.prizeNum + 1) {
                this.speed = 300;
            }
            this.t = setTimeout(() => {
                this.lightChange($prizes, changeClass, prizeArr);
            }, this.speed);
        }
    }
}
export default Sudoku;