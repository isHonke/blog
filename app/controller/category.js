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
      bgColor: 'bg-grey',
      list,
      isPost: false,
      title: '分类',
      navSlug: 'category',
    }, commonData);
    await this.ctx.render('category.html', data);
  }

  async categories() {
    const page = +this.ctx.params.page || 1;
    const limit = 12;
    const slug = this.ctx.params.categorySlug;
    const posts = await this.service.content.findPostsBySlugAndType(slug, 'category', page, limit);
    const total = await this.service.content.findPostsBySlugAndTypeTotal(slug, 'category');
    const options = {
      base: `/category/${slug}/`,
      total: Math.ceil(total / limit),
      current: page,
      prev_text: '←',
      next_text: '→',
    };
    const name = posts[0] && posts[0].name || slug;
    const commonData = await this.service.common.getCommonData();
    const data = Object.assign({
      bgColor: 'bg-white',
      commonTitle: 'Category : ' + name,
      posts: posts.length !== 0 ? posts : '',
      isPost: false,
      title: name,
      navSlug: slug,
      options,
    }, commonData);
    await this.ctx.render('archive.html', data);
  }
}

module.exports = CategoryController;
