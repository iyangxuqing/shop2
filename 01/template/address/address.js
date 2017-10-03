import { Component } from '../component.js'

let methods = {

  onAddressTap: function (e) {
    let address = this.getData()
    let province = address.province || ''
    let city = address.city || ''
    let district = address.district || ''
    let detail = address.detail || ''
    wx.navigateTo({
      url: '/pages/addressEditor/addressEditor?province=' + province + '&city=' + city + '&district=' + district + '&detail=' + detail,
    })
  }

}

export class Address extends Component {

  constructor(options, parentScope) {
    super({
      scope: 'address',
      parentScope: parentScope,
      data: options,
      methods: methods
    })
  }

  onAddressUpdate(address) {
    this.setData(address)
  }

}