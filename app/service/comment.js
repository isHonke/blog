'use strict';

const Service = require('egg').Service;

class CommentService extends Service {
  // 获取指定条数最近文章
  async findRecentComments(limit) {
    return await this.app.mysql.select('comment', {
      where: { status: 1 },
      orders: [[ 'created', 'asc' ]],
      limit,
      offset: 0,
    });
  }
}

module.exports = CommentService;
