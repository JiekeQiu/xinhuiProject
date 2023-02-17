import { getAxios } from "./base.js";


export function xiugai(){
    getAxios("/goodsname", { name: row.name, typename: row.typename }).then(
        data => {
          /*
            思路：
              直接库存副数-历史副数，库存左-历史左，库存右-历史右
              因为不可能两手都有数，所以分为2种情况：
                一、左手有值
                  1、库存值大于等于历史值，则直接相减
                  2、库存值小于历史值，库存副数的值需要扣除相减后得到的值，相减后得到的值则为右手的值
                  3、判断左右手是否都有值，有值则大的减去小的就为副数
                二、右手有值
                  1、库存值大于等于历史值，则直接相减
                  2、库存值小于历史值，库存副数的值需要扣除相减后得到的值，相减后得到的值则为左手的值
                  3、判断左右手是否都有值，有值则大的减去小的就为副数


            */
          // 拿到历史记录的数据
          let _num = data.num - row.num;
          let _numL = data.numL - row.numL;
          let _numR = data.numR - row.numR;
          let res = this.numList[0];
          if (_num <= 0) {
            // 当库存副数等于0时左右手就不存在有负数的情况
            if (_numL == _numR) {
              let num = _num + _numL;
              res.num = num;
            } else {
              let num = 0;
              res.num = num;
            }
            res.numL = _numL;
            res.numR = _numR;
          } else if (_num > 0) {
            if (_numL <= _numR) {
              let num = _num + _numL;
              let numL = _numL - _numL;
              let numR = _numR - _numL;
              res.num = num;
              res.numL = numL;
              res.numR = numR;
              if (numL > numR) {
                res.num = num + numR;
                res.numL = numL - numR;
                res.numR = numR - numR;
              } else if (numL < numR) {
                res.num = num + numL;
                res.numL = numL - numL;
                res.numR = numR - numL;
              }

              console.log("左小于右", num, numL, numR, res);
            } else if (_numL > _numR) {
              let num = _num + _numR;
              let numL = _numL - _numR;
              let numR = _numR - _numR;
              res.num = num;
              res.numL = numL;
              res.numR = numR;
              if (numL > numR) {
                res.num = num + numR;
                res.numL = numL - numR;
                res.numR = numR - numR;
              } else if (numL < numR) {
                res.num = num + numL;
                res.numL = numL - numL;
                res.numR = numR - numL;
              }
              console.log("左大于右", num, numL, numR);
            }
          }

        }
      );
};