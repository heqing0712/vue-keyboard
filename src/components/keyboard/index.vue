<template>

  <div class="kb">

    <div class="plate-number">
      <div class="item" :class="{active:activeIndex==0}" @click="inputKeyboard(0)">{{plateNumber[0]}}</div>
      <div class="item" :class="{active:activeIndex==1}" @click="inputKeyboard(1)">{{plateNumber[1]}}</div>
      <div class="item item-dot">
        <div class="dot"></div>
      </div>
      <div class="item" :class="{active:activeIndex==2}" @click="inputKeyboard(2)">{{plateNumber[2]}}</div>
      <div class="item" :class="{active:activeIndex==3}" @click="inputKeyboard(3)">{{plateNumber[3]}}</div>
      <div class="item" :class="{active:activeIndex==4}" @click="inputKeyboard(4)">{{plateNumber[4]}}</div>
      <div class="item" :class="{active:activeIndex==5}" @click="inputKeyboard(5)">{{plateNumber[5]}}</div>
      <div class="item" :class="{active:activeIndex==6}" @click="inputKeyboard(6)">{{plateNumber[6]}}</div>
      <div class="item item-new-energy" :class="{active:activeIndex==7,hasval:plateNumber[7]!=''}"
        @click="inputKeyboard(7)">
        <div class="txt" v-if="activeIndex==7||plateNumber[7]!=''"> {{plateNumber[7]}} </div>
        <div class="txt txt-tip" v-else>
          <div class="ico">+</div>
          <div class="tit">新能源</div>
        </div>
      </div>
    </div>

    <div class="keyboard-popup" v-show="show" :data-key="time">

      <div class="kb-keyboard">
        <div class="kb-keyboard-provs flex-brick" v-show="mode==1">
          <div class="kb-keyboard_td" v-for="item in provinces" @click="tapKeyboard" :data-val="item">{{item}}</div>
        </div>

        <div class="kb-keyboard-nums flex-brick" v-show="mode==2">
          <div class="kb-keyboard_td" :class="{disabled:activeIndex==1 }" v-for="item in numbers" @click="tapKeyboard"
            :data-val="item">{{item}}</div>
        </div>

        <div class="kb-keyboard-letters flex-brick" v-show="mode==2">
          <div class="kb-keyboard_td" :class="{disabled:activeIndex > 1 && item=='Q'}" v-for="item in letters"
            @click="tapKeyboard" :data-val="item">{{item}}</div>
        </div>

        <div class="kb-keyboard-action flex-brick">
          <div class="kb-keyboard_td kb-keyboard__del" @click="tapDelete">
            <div class="ico-del"></div>
          </div>
          <div class="kb-keyboard_td kb-keyboard__finished" @click="tapFinish">确定</div>
        </div>
      </div>

    </div>
  </div>

  </div>

</template>

<script>
  export default {

    name: "keyboard",

    props: {


      //车牌号码
      plateNumber: {
        type: Array,
        default: ["", "", "", "", "", "", "", ""]
      }


    },
    data() {


      return {

        //显示
        show: false,

        //省份
        provinces: "京津沪冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤川青藏琼宁渝",

        //字母
        letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

        //数字
        numbers: "0123456789",

        //当前输入索引
        activeIndex: -1,

        /* 
        键盘模式 0 关闭状态  1 显示省份输入 2 显示数字和字母输入
        */
        mode: 0,

        //变动时间截
        time: 0



      };
    },

    created() {

      let plateNumber = this.plateNumber;

      if (plateNumber.length < 8) {
        for (let i = 0; i < 8; i++) {
          if (plateNumber[i] === undefined) {
            plateNumber[i] = '';
          }
        }
        this.updateData(plateNumber);
      }
    },
    methods: {

      updateData(v) {
        this.$emit('update:plateNumber', v);
        this.$emit('change', v);
        this.time = +new Date();
      },

      inputKeyboard(index) {
        this.mode = index == 0 ? 1 : 2;
        this.activeIndex = index;
        this.show = true;
      },

      tapDelete(e) {

        let activeIndex = this.activeIndex;
        let plateNumber = this.plateNumber;
        plateNumber[activeIndex] = '';

        if (activeIndex > 0) {
          this.inputKeyboard(activeIndex - 1);
        }
        this.updateData(plateNumber);

      },

      tapKeyboard(e) {

        let val = e.target.dataset.val;
        let activeIndex = this.activeIndex;
        let plateNumber = this.plateNumber;
        
        plateNumber[activeIndex] = val;

        if (activeIndex < 7) {
          this.inputKeyboard(activeIndex + 1);
        } else {
          this.tapFinish();
        }
        this.updateData(plateNumber);
      },

      tapFinish(e) {
        this.show = false;
        this.mode = 0;
        this.activeIndex = -1;
      },
    },
    mounted() {

    }
  };
</script>

<style lang="scss" scope>
  $gutter-width: 12px;

  .plate-number {

    font-size: 34px;
    display: flex;
    justify-content: space-between;

    .item {
      width: 76px;
      height: 98px;
      line-height: 98px;
      text-align: center;
      border: 1px solid #999590;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;

      &.item-new-energy {
        line-height: 1em;
        display: flex;
        align-items: center;
        border: 1px dashed #999590;

        .ico {
          line-height: 1em;
          font-size: 34px;
          margin-bottom: -5px;
          color: #777;
        }

        .tit {
          font-size: 24px;
          transform: scale(0.7);
          color: #777;
        }
      }

      &.active {
        color: #37CA9B;
        border: 1px solid #37CA9B;
        -webkit-animation: breath 0.5s ease-in-out infinite;
        -webkit-animation-direction: alternate;
      }

      &.item-dot {
        border: none;
        width: auto;
        padding: 0 6px;

        .dot {
          width: 12px;
          height: 12px;
          background: #a09c96;
          border-radius: 10px;
        }
      }

    }
  }

  .keyboard-popup {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    background: #d9d9d9;
    z-index: 888
  }

  .kb-keyboard {
    padding: $gutter-width/2;
    position: relative;
  }

  .flex-brick {
    display: flex;
    flex-flow: row wrap;
  }

  .kb-keyboard-action {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: $gutter-width/2;
    right: $gutter-width/2;
  }

  .kb-keyboard_td {
    color: #1e1e1e;
    box-shadow: 1PX 1PX 1PX #919191;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc((100vw - #{$gutter-width}) / 10 - #{$gutter-width});
    font-size: 18PX;
    height: 48PX;
    margin: $gutter-width/2;
    border-radius: 5PX;

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &:active {
      background: #f2f2f2;
    }
  }

  .kb-keyboard__del {
    align-self: flex-end;
    width: calc(((100vw - #{$gutter-width}) / 10 - #{$gutter-width}) * 1.3);
    height: 48PX;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 1PX;

    .ico-del {
      width: 44px;
      height: 30px;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAeCAMAAABg6AyVAAAAclBMVEUAAAAwMDAxMTEMDAwpKSkpKSkwMDAqKioxMTExMTEpKSkqKiokJCQpKSkpKSkqKioqKioqKioqKioqKiopKSkoKCgoKCgnJycqKioqKioqKioqKioqKioqKioqKiorKysrKysoKCgqKioAAAAlJSUqKipvWYGQAAAAJXRSTlMA/lcC+OyZhmk+lioH8OXd1MlOPzQZDCDcvr2ysaWjajsTEgEiwq/YugAAAM9JREFUOMud1McWgyAQBdABKxp7S+/v/38xDUPAY/DwNs7iLoQZhoycCswkiFY69RL8SaTbA/yaZnJGQD9Z7ZA1NBuAVPoNgpaW4UuFPKVluCuxHmgZHgqUnTxmHAqSEWHsTXCao7rKOmaM8U/Jn2Vs4jbAtieZkL30aFlo4CbDXrVHsLeWlgkd1z6O3teOiMsPaZj7SG5EE62swqkvm25qZRWOkNAkfLTu2P4bzge0X51rU+ztdh0kmbtlRC3D7/Cs3B+s6yqwLxnX9WVfjA8P3SLCPZZ7QgAAAABJRU5ErkJggg==);
      background-size: 100% 100%;
    }
  }

  .kb-keyboard__finished {
    width: calc(((100vw - #{$gutter-width}) / 10 - #{$gutter-width}) * 1.8);
  }


  @-webkit-keyframes breath {
    from {
      border-color: rgba(55, 202, 155, 0.2);
    }

    to {
      border-color: rgba(55, 202, 155, 1);
    }
  }
</style>