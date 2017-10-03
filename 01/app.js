let config = require('/utils/config.js')
import 'utils/utils.js'
import { User } from 'utils/user.js'
import { Listener } from 'utils/listener.js'

App({

  youImageMode: config.youImageMode,

  onLaunch: function () {
    this.listener = new Listener()
    User.login()
    User.getUser({
      fields: 'role'
    }).then(function (user) {
      this.user = Object.assign({}, this.user, user);
    }.bind(this))
  },

})