'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {
  async allCategories() {
    this.ctx.body = 'all categories';
  }

  async categories() {
    this.ctx.body = `categories: ${this.ctx.params.categoryName}, ${this.ctx.params.page || 1}`;
  }
}

module.exports = CategoryController;
