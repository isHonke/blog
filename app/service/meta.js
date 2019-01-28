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

  // 获取搜索页需要的标签
  async findAllTags() {
    const sql = 'select m.mid, m.name, m.slug, m.count from meta as m where m.type = "tag" and m.count != 0 order by m.count desc limit 50';
    return await this.app.mysql.query(sql);
  }
}

module.exports = MetaService;
