class LocalData {
  constructor(name) {
    this.LS = null
    this.name = name
    this.data = {}
    this.checkLS()
    this.init(name)
  }

  checkLS() {
    if (window && window.localStorage) {
      this.LS = window.localStorage
    } else {
      console.error('is localStorage here?')
    }
  }

  init(name) {
    if (this.LS) {
      if (this.LS[name]) {
        this.data = JSON.parse(this.LS[name])
      }
    }
  }

  set(key, value) {
    this.data[key] = value
    this.LS[this.name] = JSON.stringify(this.data)
  }

  get(key) {
    if (this.data[key]) {
      return this.data[key]
    } else {
      return undefined
    }
  }
}

const lsStore = new LocalData('mocker')

export default lsStore

