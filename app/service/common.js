'use strict';

const Service = require('egg').Service;

const func = require('../utils/function.js');
const yaml2obj = require('../utils/yaml2obj.js');

class CommonService extends Service {
  // 获取header和footer数据
  async getCommonData() {
    const prefix = this.app.config.baseDir + '/app/config/';
    const site = yaml2obj(prefix + 'site.yml');
    const theme = yaml2obj(prefix + 'theme.yml');
    const pages = await this.service.content.findAllPages();
    const recentPosts = await this.service.content.findRecentPosts(theme.recentlyPosts.limit);
    // const recentComments = await this.service.comment.findRecentComments(8);
    const data = {
      site,
      theme,
      pages,
      year: new Date().getFullYear(),
      recentPosts,
      func,
      // recentComments,
    };
    return data;
  }
}

module.exports = CommonService;
