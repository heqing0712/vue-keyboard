<template>

  <div class="kb">

        <div class="plate-number">
            <div class="item" :class="{active:activeIndex==0}" @click="inputKeyboard(0)">{{vin[0]}}</div>
            <div class="item" :class="{active:activeIndex==1}" @click="inputKeyboard(1)">{{vin[1]}}</div>
            <div class="item item-dot">
              <div class="dot"></div>
            </div>
            <div class="item" :class="{active:activeIndex==2}"  @click="inputKeyboard(2)">{{vin[2]}}</div>
            <div class="item" :class="{active:activeIndex==3}" @click="inputKeyboard(3)">{{vin[3]}}</div>
            <div class="item" :class="{active:activeIndex==4}"  @click="inputKeyboard(4)">{{vin[4]}}</div>
            <div class="item" :class="{active:activeIndex==5}"  @click="inputKeyboard(5)">{{vin[5]}}</div>
            <div class="item" :class="{active:activeIndex==6}" @click="inputKeyboard(6)">{{vin[6]}}</div>
            <div class="item item-new-energy" :class="{active:activeIndex==7,hasval:vin[7]!=''}" @click="inputKeyboard(7)">
              <div class="txt" v-if="activeIndex==7||vin[7]!=''"> {{vin[7]}} </div>
              <div class="txt txt-tip" v-else>
                <div class="ico">+</div>
                <div class="tit">新能源</div>
              </div>
            </div>
        </div>

        <div class="keyboard-popup"  v-show="show" :data-key="time">

          <div class="kb-keyboard">
            <div class="kb-keyboard-provs flex-brick"  v-show="mode==1">
              <div class="kb-keyboard_td"  v-for="item in provinces"  @click="tapKeyboard" :data-val="item">{{item}}</div>
            </div>

            <div class="kb-keyboard-nums flex-brick" v-show="mode==2">
              <div class="kb-keyboard_td" :class="{disabled:activeIndex==1 }"  v-for="item in numbers" @click="tapKeyboard" :data-val="item">{{item}}</div>
            </div>

            <div class="kb-keyboard-letters flex-brick"  v-show="mode==2">
              <div class="kb-keyboard_td" :class="{disabled:activeIndex > 1 && item=='Q'}"  v-for="item in letters" @click="tapKeyboard" :data-val="item">{{item}}</div>
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

  name:"keyboard",

  props: {


    //车牌号码
    plateNumber:{
      type:Array,
      default:null
    }


  },
  data() {


    return {

      //显示
      show:false,

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
      time: 0,

      //车牌号码 Vehicle Identification Number简称VIN
      vin: ["", "", "", "", "", "", "", ""]
      
    };
  },

  created(){

      let pnum = this.plateNumber;
      let vin = this.vin;
      
      if(pnum){

        vin.forEach((v,i)=>{
              if(pnum[i]!==undefined){
              vin[i]= pnum[i];
              }
        });

        this.vin =vin;
      }

  },

  computed: {},
  methods: {

    updateData(){
      this.$emit('update:plateNumber',this.vin);
      this.$emit('change',this.vin);
      this.time = +new Date();
    },
    
    inputKeyboard(index) {
      this.mode = index == 0 ? 1 : 2;
      this.activeIndex = index;
      this.show = true;
    },

    tapDelete(e) {

      let activeIndex = this.activeIndex;
      this.vin[activeIndex] = '';
      if (activeIndex > 0) {
        this.inputKeyboard(activeIndex - 1);
      }
      this.updateData();
  
    },

    tapKeyboard(e) {

      let val = e.target.dataset.val;
      let activeIndex = this.activeIndex;
      this.vin[activeIndex] = val;

      if (activeIndex < 7) {
        this.inputKeyboard(activeIndex + 1);
      } else {
        this.tapFinish();
      }
      this.updateData();
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

  font-size:34px;
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
      color:#37CA9B;
      border: 1px solid #37CA9B;
      -webkit-animation:breath 0.5s ease-in-out infinite;   
      -webkit-animation-direction:alternate;
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
  z-index:888
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
            border-color:rgba(55, 202, 155, 0.2); 
     }                        
    to   {  border-color:rgba(55, 202, 155, 1);  }                        
}
.kb-platenum {


  .item,.item-new-energy.active,.item-new-energy.hasval{
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABiCAMAAADN78VfAAAAolBMVEUA1KoS07MS1LES1LES1bIT1LIS07Hp9PPm8/Ls9fTv9vXx9/bj8vHk8vHh8fDr9PPu9fTo8/Lm8vDd7+7a7uzQ6ebj8e/Q5+Pg7+3U6+nI5ODZ7OnF4ty83djN5uLe7uzc7uvX6ufL5eLU6ebg8O/W7OrD4d7V6ufO5+TF49/f7+6+4d253Naz29TC4dur2NCH1slm18NE1r0/1LqU3dKP28+zoG4RAAAABnRSTlMBkfLUK7xb1JuaAAADmklEQVRYw83Z23KqMBQG4Lrbilo5CgGhEgQp4AFtbd//1fYKoAFi9tQEZ/Z/QaCLfPMz9S5PJC+j5z9jifx5Hr08NRmNB8iotl7Hg+T10ut8Oh4Oe8jqzpA9h8PxdK67vcDyeTzsV2X5LpSyXO0Px09gXkixM1Dvvh+6Qglj/x24M6n2PB6f9mURusmaJIDA0tzXV/o3dg5J3NAv96fx+PkJfhOH0neTIMIYe/cH4wg4vzzAL+QJvnVVuFmEPWQJBXk4ylx/BRDByjgJMLJMRdHvjqIoJvKCJC4brHDXGJn61BDKVDcRXrtFg/lJ5Fm6MXsTyszQLS9K/AYLswiZU7AEtamJoiy8YlgcgwCGu5jxJoWtr9haqtmsj1lymPW4ZvIY/785g9C1eeLNZzqD6bNOKEPDmxMsY7BfbqfhY0IZHrMe1iyJkKUbMs2i5ILFFSZsGTcwQw6LH4YpU1FsqlibDrYB7EY1A0LvOHPAeM34AGfOaVanfo0lDd6cwTzLJNgUcrnSzc1feHPAPAarAq054c/NNuYnAcGEA1jANBMJ22wIzG9hyNQHwpzAU2Uw5AWtZlKY3mC0GZJs5gyE6TcwRRRTLAazhsMwYHrVGdK9wlqHNwcMd7AFwfqbKceCdE6wReBeMbdupkD05kpevdw1K2/ea+ZWzf4R2MhP1czpNRMOaeY+CEulMHWD0w6mqRKY1sM2linRbDjMtHpYJIdFPUydDITlgCFxDAGWFw1WNJgJUfjhzSddzM0Ixmyr1x7CzgmW5T5tZgNm0s1VfvsMmN3+zGW0RZNJ1RlCr+3w52gbLRlMJCwWymBsM1sOs9vNMtlmWfsz7YUmbKnawl6GF+wjzKQwtLDbzQimSjQDrNMMASYY0iz8aGMb8WaDYpvbmAqBhd61w8w5WBJcsInag+hWZk6xIOljJNdX6RMNZ97DYoLNmW297bw5BxPLvIc5spgTPwpLCTaHqPUV0tzRlTefb+2028zezPkhBD/a1u41s7faXDC0GcWELY1i8s20BYMt/kds51dYld57EHrHmVeYv+ti9YgCv31msCVgTWiPbjvuHLBlG8sB22i3QxnOnGB5jZFjjyJ3UqIJZUG+Mi/IsQc5kPn5gGqg8YMxf2bbKRT7+IEDGXJU9LUrYmeZprZQ0nTpxMXuC46K6kMs0HJnKRgnB6s+xIJq0O1758d5njt3BzbF/u77C5DRkAd/Ax9JDnpY+hc7UYbh09TP0gAAAABJRU5ErkJggg==);
      background-repeat: no-repeat;
      background-size: contain;
      border:none!important;
   
    }

   .item-new-energy{
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABiCAMAAADN78VfAAAA21BMVEUAAADj29rb2Nji2tjk29nv6uji2tjw6enp393z6urj2trv6ujj29ni2tjj2tjk3Nzj29ni29vj3tnp4eHv6enx6+ni2tjj29jj29nj29nj29rk3Nvi29nj29nj3Nnk3Nri3Njj29ji29jj29nl3Nrl3drj2tji29nj29jk29jm39zj29nj2tnj2tnj3Nnk3Nrw6unv6urj29r07ujq5N7i29jv6ejv6ujj3Nrm29vv6uni29ji2tjw6unk29vv6ejv6unv6ufj3Nnu6efw6enw6+nw6Ojv6eji2tgCpRrYAAAAR3RSTlMAiQXub7zRQww+PcCy8qkljjAUAoF9Z2Hq4kYf3ZGBNzP5nGpNENnVuVwZxq2YUXazk1UrCefUj3sp8szApRzofGBa2MaLZgV5xAQAAAL0SURBVFjD7dgJj5pAAIbhbwZFlnIJ7XKpLCLertfeV+8O//8XdUbZNJu00i403bY8iRhC8kZmZEDxiOWeu5+j2wpiX9Z012q+nZaOKW9ZU9TWjDUdlPSeZ9fAlr+9Q2nveGaLS8ZWqMCKsUtcMNZCBVqMXeCGsRQVUFb3n9FsNlGr/U5HR0dotVqoBGNMvOrYC49RIkmEVhQjGUdQ4NWrVz+znkkiJqEa2U4d+59i+XpWNlZ8BVAiZd8lEfrLMZL9EPnlmPTjmPQHYuVPs/oJKP/VyNezF3gF1LG/I5bf6ipZz/Kb8Et8PHi5T0F17Ol69jf93rRDPOFAoA6e41jeN6Yb4wpcdwFOPs2PqoDaeERxCJ3PtUybz0M59ma9EwBt3TTnFPLG3BAL+KAnsOR+vz+c8c3hmOMuXde9clMpyk+6k8CZEciZd0cGIn6eWDyKoYpCin7NXyGkNoT0drTsGqO4LX8QB8GZtmUFvp/5vn+NgxxlQZREU5w8Rhdk6QYmWYoxo7Fy1g8ByxqMKTdqH17P2tleIGXCBNNjIcAdCUP3HE7Pi0Rs2OO8dvEVoItxl4Jpbzw9g6ovFouZgdOh5/kJAPdc6ZKBPOH8othJFOluFIkxa2gA1A6AhgHXRG6K/tVgdsJ1imKz0SjrjEY0NvNYPBwOPQNizNLdgAe2lkTjsd8Zj82CGNpUjwKEWZrH/IeHhx6PaYYca7vpNuUACroENgpidmzr0bkZeMhjHh9/g8cMV1XAHY9pHJoe7ZKTDi2IJWM+ARa50h5jerfbvdufJnopIA9UH2QhPpk2ORyjnQ2PXRPfxdMJELGzOMWg41h9UzdFTB05B9cz9XZ6nIUYeMq32JTIBMZwPpdvgdmSSlE7CRtyAyApDqK2kfCtCiBoADAJaK9hQxlMJhsbOLURALCtZYrav6v+/6yO1c9n/5EzlPbefmx9Wh0pKEFprdjHEIJzz3beYO81e9b+/T62riK2ptjbXl7clIndXFxuwX0Fvtz92v8fUNAAAAAASUVORK5CYII=);
      .txt-tip{
        display:none!important;
      }
    }


    .item-dot{
      display:none;
    }
}
</style>