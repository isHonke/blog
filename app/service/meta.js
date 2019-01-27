'use strict';

const Service = require('egg').Service;

class MetaService extends Service {
  // 获取文章分类
  async findCategoryById(cid) {
    const sql = 'select m.name, m.slug from meta as m join relationship as r where r.cid = ? and r.mid = m.mid and m.type = "category"';
    const res = await this.app.mysql.query(sql, [ cid ]);
    return res[0];
  }

  // 获取文章标签
  async findTagsById(cid) {
    const sql = 'select m.name, m.slug from meta as m join relationship as r where r.cid = ? and r.mid = m.mid and m.type = "tag"';
    const res = await this.app.mysql.query(sql, [ cid ]);
    return res;
  }

  // 获取所有分类
  async findAllCategories() {
    return await this.app.mysql.select('meta', {
      where: { type: 'category' },
    });
  }
}

module.exports = MetaService;
