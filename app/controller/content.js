'use strict';

const Controller = require('egg').Controller;

class ContentController extends Controller {
  async allPosts() {
    this.ctx.body = 'all posts';
  }

  async posts() {
    this.ctx.body = `posts: ${this.ctx.params.page || 1}`;
  }

  async post() {
    this.ctx.body = `post: ${this.ctx.params.cid}, ${this.ctx.params.page || 1}`;
  }

  async page() {
    this.ctx.body = `page: ${this.ctx.params.slug}`;
  }
}

module.exports = ContentController;
