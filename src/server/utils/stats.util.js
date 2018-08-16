data = {}

module.exports = {

  init(key) {
    data[key] = 0
    setInterval(() => {
      console.log(key + ": " + data[key] + "/s")
      data[key] = 0
    }, 1000)
  },

  update(key) {
    data[key]++
  }

}