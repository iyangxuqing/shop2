import { Component } from '../component.js'
import { User } from '../../utils/user.js'

let data = {
  defaults: {
    nickName: '',
    avatarUrl: '',
  }
}

let methods = {
  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      this.setData(e.detail.userInfo)
      User.setUser(e.detail.userInfo)
    }
  }
}

export class UserInfo extends Component {
  constructor(options, parentScope) {
    super({
      scope: 'userInfo',
      parentScope: parentScope,
      data: options,
      methods: methods
    })
  }
}