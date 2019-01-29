'use strict';

const Controller = require('egg').Controller;

class ContentController extends Controller {
  async allPosts() {
    const list = [];
    const dates = await this.service.content.findDatesByMonth();
    for (const key in dates) {
      const item = dates[key];
      const posts = await this.service.content.findPostsByMonth(item.queryTime);
      list.push({
        date: item.showTime,
        posts,
      });
    }
    const commonData = await this.service.common.getCommonData();
    const data = Object.assign({
      bgColor: 'bg-grey',
      list,
      postShare: false,
      postDirectory: false,
      title: '归档',
      navSlug: 'timeline',
    }, commonData);
    await this.ctx.render('timeline.html', data);
  }

  async posts() {
    const page = +this.ctx.params.page || 1;
    const limit = 12;
    const posts = await this.service.content.findPosts(page, limit);
    const commonData = await this.service.common.getCommonData();
    const total = await this.service.content.findPostsTotal();
    const options = {
      base: '/page/',
      total: Math.ceil(total / limit),
      current: page,
      prev_text: '←',
      next_text: '→',
    };
    const data = Object.assign({
      bgColor: 'bg-grey',
      posts,
      postShare: false,
      postDirectory: false,
      title: '',
      navSlug: '',
      options,
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
      title: post.title,
      navSlug: '',
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
      title: page.title,
      postShare: false,
      postDirectory: false,
      navSlug: page.slug,
    }, commonData);
    await this.ctx.render('page.html', data);
  }
}

module.exports = ContentController;
