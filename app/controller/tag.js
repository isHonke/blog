'use strict';

const Controller = require('egg').Controller;

class TagController extends Controller {
  async tags() {
    this.ctx.body = `tags: ${this.ctx.params.tagSlug}, ${this.ctx.params.page || 1}`;
  }
}

module.exports = TagController;
