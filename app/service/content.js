'use strict';

const Service = require('egg').Service;

class ContentService extends Service {
  // 获取所有独立页面信息
  async findAllPages() {
    const res = await this.app.mysql.select('content', {
      where: { type: 'page', status: 1 }, // WHERE 条件
      columns: [ 'cid', 'title', 'slug' ], // 要查询的表字段
      orders: [[ 'order', 'asc' ]], // 排序方式
    });
    return res;
  }

  // 分页获取文章信息
  async findPosts(page, limit) {
    const res = await this.app.mysql.select('content', {
      where: { type: 'post', status: 1 }, // WHERE 条件
      orders: [[ 'created', 'asc' ]], // 排序方式
      limit, // 返回数据量
      offset: (page - 1) * limit, // 数据偏移量
    });
    return res;
  }
}

module.exports = ContentService;
