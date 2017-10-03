import { Component } from '../component.js'
import { User } from '../../utils/user.js'

let data = {
  defaults: {
    codeRequestText: '发送验证码',
    number: '',
    code: '',
    numberError: false,
    codeError: false,
    verified: false,
    codeInputAnimateCss: ''
  }
}

let methods = {

  onCodeRequest: function (e) {
    let mobile = e.detail.value.number
    if (mobile == '') return

    let codeRequestText = this.getData('codeRequestText')
    if (codeRequestText != '发送验证码') return

    var reg = /^1[3|4|5|7|8]\d{9}$/
    if (!reg.test(mobile)) {
      getApp().listener.trigger('toptip', '手机号码输入有误')
      this.setData({
        numberError: true
      })
      return
    }

    this.setData({
      number: mobile
    })

    User.mobileCodeRequest(mobile)
      .then(function (res) {
        if (res.error == 'this mobile is used') {
          getApp().listener.trigger('toptip', '手机号码已被绑定')
          this.setData({
            numberError: true
          })
        }
      }.bind(this))

    this.setData({
      codeRequestText: '60秒后重发'
    })
    let second = 60
    let timer = setInterval(function () {
      second--
      if (second == 0) {
        this.setData({
          codeRequestText: '发送验证码'
        })
        clearInterval(timer)
      } else {
        let codeRequestText = second + '秒后重发'
        if (second < 10) codeRequestText = '0' + codeRequestText
        this.setData({
          codeRequestText: codeRequestText
        })
      }
    }.bind(this), 1000)
  },

  onNumberInputFocus: function (e) {
    let page = getCurrentPages().pop()
    this.setData({
      numberError: false
    })
  },

  onCodeInput: function (e) {
    let page = getCurrentPages().pop()
    this.setData({
      code: e.detail.value
    })
  },

  onCodeInputFocus: function (e) {
    let page = getCurrentPages().pop()
    this.setData({
      codeError: false
    })
  },

  onCodeConfirm: function (e) {
    let page = getCurrentPages().pop()
    let mobile = this.getData('number')
    let code = this.getData('code')
    if (code == '') return;

    User.mobileCodeVerify(mobile, code)
      .then(function (res) {
        if (!res.error) {
          this.setData({
            codeInputAnimateCss: 'slideUp'
          })
          setTimeout(function () {
            this.setData({
              verified: true
            })
          }.bind(this), 300)
        } else {
          this.setData({
            codeError: true
          })
          getApp().listener.trigger('toptip', '验证码错误')
        }
      }.bind(this))
      .catch(function (res) {
        this.setData({
          codeError: true
        })
        getApp().listener.trigger('toptip', '验证码错误')
      }.bind(this))
  }
}

export class Mobile extends Component {
  constructor(options, parentScope){
    super({
      scope: 'mobile',
      parentScope: parentScope,
      data: Object.assign({}, data.defaults, options),
      methods: methods
    })
  }
}