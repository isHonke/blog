'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {
  async allCategories() {
    const list = [];
    const categories = await this.service.meta.findAllCategories();
    for (const key in categories) {
      const item = categories[key];
      const posts = await this.service.content.findPostsByMid(item.mid);
      const _posts = posts.map(ele => {
        const create_date = new Date(ele.created * 1000);
        ele.time = create_date.toDateString().split(' ').splice(1)
          .join(' ');
        return ele;
      });
      list.push({
        category: item,
        posts: _posts,
      });
    }
    const commonData = await this.service.common.getCommonData();
    const data = Object.assign({
      bgColor: 'bg-white',
      list,
      postShare: false,
      postDirectory: false,
      title: '分类',
      navSlug: 'category',
    }, commonData);
    await this.ctx.render('category.html', data);
  }

  async categories() {
    this.ctx.body = `categories: ${this.ctx.params.categorySlug}, ${this.ctx.params.page || 1}`;
  }
}

module.exports = CategoryController;
