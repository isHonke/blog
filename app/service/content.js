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
    const sql = `select c.*, m.name as categoryName, m.slug as categorySlug
    from content as c 
    join relationship as r 
    join meta as m
    where c.type = "post" and c.status = 1 and c.cid = r.cid and r.mid = m.mid and m.type = "category"
    order by c.created desc
    limit ?, ?`;
    return await this.app.mysql.query(sql, [ (page - 1) * limit, limit ]);
  }

  // 获取文章总条数
  async findPostsTotal() {
    const res = await this.app.mysql.select('content', {
      where: { type: 'post', status: 1 },
    });
    return res.length;
  }

  // 获取指定条数最近文章
  async findRecentPosts(limit) {
    return await this.app.mysql.select('content', {
      where: { type: 'post', status: 1 },
      orders: [[ 'created', 'desc' ]],
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
    const sql = `select c.*, from_unixtime(c.created, "%b %d, %Y") as format_created, from_unixtime(c.updated, "%b %d, %Y at %r") as format_updated
      from content as c
      where c.type = "post" and c.status = 1 and c.cid = ?`;
    return (await this.app.mysql.query(sql, [ cid ]))[0];
  }

  // 根据创建时间获取指定文章前后文章信息
  async findPostPrevAndNext(created) {
    const prevSql = `select c.cid, c.slug
      from content as c
      where c.type = "post" and c.status = 1 and c.created > ?
      order by created asc 
      limit 1`;
    const nextSql = `select c.cid, c.slug
      from content as c
      where c.type = "post" and c.status = 1 and c.created < ?
      order by created desc 
      limit 1`;
    const prev = (await this.app.mysql.query(prevSql, [ created ]))[0] || '';
    const next = (await this.app.mysql.query(nextSql, [ created ]))[0] || '';
    return {
      prev,
      next,
    };
  }

  // 获取指定项目下的所有文章
  async findPostsByMid(mid) {
    const sql = `select c.cid, c.title, c.slug, c.created 
      from content as c 
      join relationship as r 
      where r.mid = ? and r.cid = c.cid
      order by c.created desc`;
    const res = await this.app.mysql.query(sql, [ mid ]);
    return res;
  }

  // 获取所有文章的时间分组，按yyyy-mm格式
  async findDatesByMonth() {
    const sql = 'select distinct from_unixtime(created, "%Y-%m") as queryTime, from_unixtime(created, "%b %Y") as showTime from content as c where c.type = "post" and c.status = 1 order by queryTime desc';
    return await this.app.mysql.query(sql);
  }

  // 根据年月份查询文章信息
  async findPostsByMonth(dateString) {
    const sql = 'select c.cid, c.title, c.slug, from_unixtime(c.created, "%b %d, %Y") as created from content as c where c.type = "post" and c.status = 1 and from_unixtime(c.created, "%Y-%m") = ? order by c.created desc';
    return await this.app.mysql.query(sql, [ dateString ]);
  }

  // 根据meta的slug和type分页查询相应的文章信息
  async findPostsBySlugAndType(slug, type, page, limit) {
    const sql = `select c.cid, c.title, c.slug, from_unixtime(c.created, '%b %d, %Y') as created, c.icon, c.color, m.name
    from content as c
    join meta as m
    join relationship as r
    where c.type = "post" and c.status = 1 and m.slug = ? and m.type = ? and c.cid = r.cid and r.mid = m.mid
    order by c.created desc
    limit ?, ?`;
    return await this.app.mysql.query(sql, [ slug, type, (page - 1) * limit, limit ]);
  }

  // 获取根据meta的slug和type查询的所有文章总数
  async findPostsBySlugAndTypeTotal(slug, type) {
    const sql = `select count(*) as total
      from content as c
      join meta as m
      join relationship as r
      where c.type = "post" and c.status = 1 and m.slug = ? and m.type = ? and c.cid = r.cid and r.mid = m.mid`;
    return (await this.app.mysql.query(sql, [ slug, type ]))[0].total;
  }
}

module.exports = ContentService;
