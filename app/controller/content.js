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
    const page = this.ctx.params.page || 1;
    const posts = await this.service.content.findPosts(page, 20);
    const commonData = await this.service.common.getCommonData();
    const data = Object.assign({
      bgColor: 'bg-grey',
      posts,
      postShare: false,
      postDirectory: false,
    }, commonData);
    await this.ctx.render('index.html', data);
  }

  async post() {
    const { cid } = this.ctx.params;
    const post = await this.service.content.findPostById(cid);
    const create_date = new Date(post.created * 1000);
    post.time = create_date.toDateString().split(' ').splice(1)
      .join(' ');
    const category = await this.service.meta.findCategoryById(cid);
    const tags = await this.service.meta.findTagsById(cid);
    const commonData = await this.service.common.getCommonData();
    const data = Object.assign({
      bgColor: 'bg-white',
      post,
      category,
      tags,
      postShare: true,
      postDirectory: true,
    }, commonData);
    await this.ctx.render('post.html', data);
  }

  async page() {
    const { slug } = this.ctx.params;
    const commonData = await this.service.common.getCommonData();
    const page = await this.service.content.findPageBySlug(slug);
    const create_date = new Date(page.created * 1000);
    page.time = create_date.toDateString().split(' ').splice(1)
      .join(' ');
    const data = Object.assign({
      bgColor: 'bg-white',
      page,
    }, commonData);
    await this.ctx.render('page.html', data);
  }
}

module.exports = ContentController;
