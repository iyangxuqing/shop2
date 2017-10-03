import { Component } from '../component.js'
import { UserInfo } from '../../template/userinfo/userinfo.js'
import { Mobile } from '../../template/mobile/mobile.js'
import { Address } from '../../template/address/address.js'
import { __Coupons } from '../../template/coupons/coupons.js'
import { User } from '../../utils/user.js'
import { Coupons } from '../../utils/coupons.js'

export class PageWode extends Component {

  constructor(options) {
    super({
      scope: 'pageWode',
      data: options,
    })
  }

  loadData() {
    Promise.all([User.getUser({
      fields: 'avatarUrl,nickName,mobileNumber,mobileVerified,address_province,address_city,address_district,address_detail'
    }), Coupons.getCoupons()]).then(function (res) {
      let user = res[0] || {}
      let coupons = res[1] || []
      let userInfo = {
        nickName: user.nickName,
        avatarUrl: user.avatarUrl
      }
      let mobile = {
        number: user.mobileNumber,
        verified: user.mobileVerified == 1
      }
      let address = {
        province: user.address_province,
        city: user.address_city,
        district: user.address_district,
        detail: user.address_detail
      }
      this.userInfo = new UserInfo(userInfo, 'pageWode')
      this.mobile = new Mobile(mobile, 'pageWode')
      this.address = new Address(address, 'pageWode')
      this.__coupons = new __Coupons(coupons, 'pageWode')
      this.setData({
        ready: true
      })
    }.bind(this))
  }

}