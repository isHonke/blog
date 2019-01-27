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
    return await this.app.mysql.select('content', {
      where: { type: 'post', status: 1 }, // WHERE 条件
      orders: [[ 'created', 'asc' ]], // 排序方式
      limit, // 返回数据量
      offset: (page - 1) * limit, // 数据偏移量
    });
  }

  // 获取指定条数最近文章
  async findRecentPosts(limit) {
    return await this.app.mysql.select('content', {
      where: { type: 'post', status: 1 },
      orders: [[ 'created', 'asc' ]],
      limit,
      offset: 0,
    });
  }

  // 获取独立页面信息
  async findPageBySlug(slug) {
    const res = await this.app.mysql.select('content', {
      where: { type: 'page', status: 1, slug },
      limit: 1,
      offset: 0,
    });
    return res[0];
  }

  // 获取文章详情
  async findPostById(cid) {
    const res = await this.app.mysql.select('content', {
      where: { type: 'post', status: 1, cid },
      limit: 1,
      offset: 0,
    });
    return res[0];
  }

  // 获取指定项目下的所有文章
  async findPostsByMid(mid) {
    const sql = 'select c.cid, c.title, c.slug, c.created from content as c join relationship as r where r.mid = ? and r.cid = c.cid';
    const res = await this.app.mysql.query(sql, [ mid ]);
    return res;
  }
}

module.exports = ContentService;
