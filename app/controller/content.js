'use strict';

const Controller = require('egg').Controller;

class ContentController extends Controller {
  async allPosts() {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const ctx = this.ctx;
    const user = await ctx.service.user.find();
    ctx.body = user;
  }

  async posts() {
    const site = await this.service.config.findConfigByGroup('site');
    const pages = await this.service.content.findAllPages();
    const posts = await this.service.content.findPosts(1, 20);
    const data = {
      site,
      bgColor: 'bg-grey',
      pages,
      posts,
      year: new Date().getFullYear(),
    };
    console.log(posts);
    await this.ctx.render('index.html', data);
  }

  async post() {
    this.ctx.body = `post: ${this.ctx.params.cid}, ${this.ctx.params.page || 1}`;
  }

  async page() {
    this.ctx.body = `custom-page: ${this.ctx.params.slug}`;
  }
}

module.exports = ContentController;
