'use strict';

const Controller = require('egg').Controller;

class SearchController extends Controller {
  async search() {
    const tags = await this.service.meta.findAllTags();
    const commonData = await this.service.common.getCommonData();
    const data = Object.assign({
      bgColor: 'bg-grey',
      tags: tags.length !== 0 ? tags : '',
      postShare: false,
      postDirectory: false,
      title: '搜索',
      navSlug: '',
    }, commonData);
    await this.ctx.render('search.html', data);
  }

  async searchKeyword() {
    this.ctx.body = `search keyword: ${this.ctx.params.keyword}, ${this.ctx.params.page || 1}`;
  }
}

module.exports = SearchController;
