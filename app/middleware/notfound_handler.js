'use strict';

module.exports = () => {
  return async function notFoundHandler(ctx, next) {
    await next();
    if (ctx.status === 404 && !ctx.body) {
      if (ctx.acceptJSON) {
        ctx.body = {
          error: 'Not Found',
        };
      } else {
        const commonData = await await ctx.service.common.getCommonData();
        await ctx.render('404.html', commonData);
      }
    }
  };
};
