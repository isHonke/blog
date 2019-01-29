'use strict';

const Service = require('egg').Service;

class CommonService extends Service {
  // 获取header和footer数据
  async getCommonData() {
    const site = await this.service.config.findConfigByGroup('site');
    const theme = await this.service.config.findConfigByGroup('theme');
    const pages = await this.service.content.findAllPages();
    const recentPosts = await this.service.content.findRecentPosts(8);
    // const recentComments = await this.service.comment.findRecentComments(8);
    const data = {
      site,
      theme,
      pages,
      year: new Date().getFullYear(),
      recentPosts,
      // recentComments,
    };
    return data;
  }
}

module.exports = CommonService;
