'use strict';

const Service = require('egg').Service;

class ConfigService extends Service {
  // 根据组别名获取配置信息
  async findConfigByGroup(groupName) {
    const res = await this.app.mysql.select('config', {
      where: {
        group: groupName,
      },
      columns: [ 'name', 'value' ],
    });
    const configs = {};
    res.forEach(item => {
      configs[item.name] = item.value;
    });
    return configs;
  }
}

module.exports = ConfigService;
