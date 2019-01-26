'use strict';

const Controller = require('egg').Controller;

class SearchController extends Controller {
  async search() {
    this.ctx.body = 'search';
  }

  async searchKeyword() {
    this.ctx.body = `search keyword: ${this.ctx.params.keyword}, ${this.ctx.params.page || 1}`;
  }
}

module.exports = SearchController;
