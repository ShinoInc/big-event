export default {
  token: (state) => state.user.token,
  username: (state) => state.user.userInfo.username,
  nickname: (state) => state.user.userInfo.nickname,
  user_pic: (state) => state.user.userInfo.user_pic,
  cateList: (state) => state.cate.cateList,
  articleList: (state) => state.article.articleList,
  articleTotal: (state) => state.article.articleTotal,
  menus: (state) => state.menus.menus
}
