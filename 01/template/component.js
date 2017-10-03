export class Component {

  constructor(options) {
    this.page = getCurrentPages().pop()
    this.scope = options.parentScope ? options.parentScope + '.' + options.scope : options.scope
    this.page.setData({
      [this.scope]: options.data
    })
    for (let key in options.methods) {
      this.page[this.scope + '.' + key] = options.methods[key].bind(this)
      this.page.setData({
        [this.scope + '.' + key]: this.scope + '.' + key
      })
    }
  }

  getData(attr) {
    let data = this.page.data
    let scope = this.scope
    let names = scope.split('.')
    for (let i in names) {
      data = data[names[i]]
    }
    if (attr) return data[attr]
    return data
  }

  setData(data) {
    let _data = {}
    for (let i in data) {
      _data[this.scope + '.' + i] = data[i]
    }
    this.page.setData(_data)
  }

}