'use strict';

const Controller = require('egg').Controller;
const marked = require('marked');

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
      isPost: false,
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
      isPost: false,
      title: '',
      navSlug: '',
      options,
    }, commonData);
    await this.ctx.render('index.html', data);
  }

  async post() {
    const { cid } = this.ctx.params;
    const post = await this.service.content.findPostById(cid);
    post.content = marked(post.content);
    const category = await this.service.meta.findCategoryById(cid);
    const tags = await this.service.meta.findTagsById(cid);
    const relatedPosts = await this.service.content.findRelatedPosts(cid, tags);
    const prevAndNext = await this.service.content.findPostPrevAndNext(post.created);
    const commonData = await this.service.common.getCommonData();
    const data = Object.assign({
      bgColor: 'bg-white',
      post,
      category,
      tags,
      relatedPosts,
      prevAndNext,
      isPost: true,
      title: post.title,
      navSlug: '',
    }, commonData);
    await this.ctx.render('post.html', data);
  }

  async page() {
    const { slug } = this.ctx.params;
    const commonData = await this.service.common.getCommonData();
    const page = await this.service.content.findPageBySlug(slug);
    page.content = marked(page.content);
    const create_date = new Date(page.created * 1000);
    page.time = create_date.toDateString().split(' ').splice(1)
      .join(' ');
    const data = Object.assign({
      bgColor: 'bg-white',
      page,
      title: page.title,
      isPost: false,
      navSlug: page.slug,
    }, commonData);
    await this.ctx.render('page.html', data);
  }
}

module.exports = ContentController;
