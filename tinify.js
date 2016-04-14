/**
 * @file
 * @auther Created by malin on 15/12/13.
 */

//    目前不知道怎么压缩多文件  每个月只能压缩500 图片， 同文件多次压缩，算多次
//    修改F_PATH      process.argv为命令行参数  ['node', '/path/to/hello', 'F_PATH']
//    执行 node tinify F_PATH
//    node tinify src/img/wechat/nav/nav-1.png
const tinify = require('tinify');
const F_PATH = process.argv[2];
tinify.key = 'jc1zPetF1V7aAlfZV8krSkpOFSMzi1Cj';
tinify.fromFile(F_PATH).toFile(F_PATH);
