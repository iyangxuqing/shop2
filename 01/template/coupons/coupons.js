import { Component } from '../component.js'

export class __Coupons extends Component {

  constructor(options, parentScope) {
    super({
      scope: 'coupons',
      parentScope: parentScope,
      data: options
    })
  }

  onCouponsUpdate(coupons) {
    this.setData(coupons)
  }

}