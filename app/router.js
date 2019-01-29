'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 前台路由，交由controller渲染页面
  router.get('/', controller.content.posts);
  router.get('/page/:page', controller.content.posts);
  router.get('/p/:cid', controller.content.post);
  // router.get('/p/:cid/comment-:page', controller.content.post);
  router.get('/custom-:slug', controller.content.page);

  router.get('/category/:categorySlug', controller.category.categories);
  router.get('/category/:categorySlug/:page', controller.category.categories);

  router.get('/tag/:tagSlug', controller.tag.tags);
  router.get('/tag/:tagSlug/:page', controller.tag.tags);

  router.get('/archives', controller.category.allCategories);
  router.get('/timeline', controller.content.allPosts);
  // router.get('/search', controller.search.search);

  // router.get('/search/:keyword', controller.search.searchKeyword);
  // router.get('/search/:keyword/:page', controller.search.searchKeyword);

  // 后台路由，返回接口数据
};
