'use strict';

const Controller = require('egg').Controller;

class TagController extends Controller {
  async tags() {
    const page = this.ctx.params.page || 1;
    const limit = 1;
    const slug = this.ctx.params.tagSlug;
    const posts = await this.service.content.findPostsBySlugAndType(slug, 'tag', page, limit);
    const total = await this.service.content.findPostsBySlugAndTypeTotal(slug, 'tag');
    const options = {
      base: `/tag/${slug}/`,
      total: Math.ceil(total / limit),
      current: page,
      prev_text: '←',
      next_text: '→',
    };
    const name = posts[0] && posts[0].name || slug;
    const commonData = await this.service.common.getCommonData();
    const data = Object.assign({
      bgColor: 'bg-white',
      commonTitle: 'Tag : ' + name,
      posts: posts.length !== 0 ? posts : '',
      postShare: false,
      postDirectory: false,
      title: name,
      navSlug: slug,
      options,
    }, commonData);
    await this.ctx.render('archive.html', data);
  }
}

module.exports = TagController;
