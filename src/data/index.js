module.exports = {
  bbs: [
    // /login
    {
      url: '/login',
      regex: true,
      desc: '@title(5)',
      method: 'POST',
      delay: 1000,
      req: {
        username: 'admin',
        password: '123456',
      },
      mock: true,
      res: {
        code: 200,
        info: 'Get data success',
        data: {
          'accessToken|1': [
            'root-accessToken',
            'admin-accessToken',
            'user-accessToken',
          ],
        },
        success: true,
      },
    },
    // /userInfo
    {
      url: '/userInfo',
      regex: true,
      desc: '@title(5)',
      method: 'POST',
      delay: 1000,
      req: {
        username: 'admin',
        password: '123456',
      },
      mock: true,
      res: {
        code: 200,
        info: 'Get data success',
        data: {
          'roles|1': [['root'], ['admin'], ['user']],
          'ability|1': [['READ'], ['WRITE'], ['DELETE']],
          'username|1': ['root', 'admin', 'user'],
          'avatar|1': [
            'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
            'https://i.gtimg.cn/club/item/face/img/8/15918_100.gif',
          ],
        },
        success: true,
      },
    },
    // /logout
    {
      url: '/logout',
      regex: true,
      desc: '@title(5)',
      method: 'POST',
      delay: 1000,
      req: {},
      mock: true,
      res: {
        code: 200,
        info: 'Logout success',
        data: {},
        success: true,
      },
    },
    // /roles/dashboard
    {
      url: '/roles/dashboard',
      regex: true,
      desc: '@title(5)',
      method: 'GET',
      delay: 1000,
      req: {},
      mock: true,
      res: {
        code: 200,
        info: 'Logout success',
        'data|50-100': [
          {
            uuid: '@uuid',
            id: '@id',
            name: '@cname()',
            description: '@csentence',
            'status|1': ['normal', 'abnormal'],
            'group|1': ['root', 'admin', 'user'],
          },
        ],
        success: true,
      },
    },
    {
      url: '/user/get-post-comment-praise',
      regex: true,
      desc: '@title(5)',
      method: 'GET',
      delay: 1000,
      req: {
        pageNo: "@date('yyyy-MM-dd')",
        pageSize: 'all',
        type: 'all',
        userId: 'all',
      },
      mock: true,
      res: {
        code: 200,
        info: 'Get data success',
        data: {
          current: 1,
          'data|0-100': [
            {
              id: '@integer(1, 1000000)', //记录id
              content: '@cparagraph(2, 8)', //帖子内容
              'imagesUrl|0-9': ["@image('200x100')"], //帖子图片

              commentNumber: '@integer(1, 100000)', //评论数
              forwardNumber: '@integer(1, 100000)', //转发数
              praiseNumber: '@integer(1, 100000)', //点赞数
              userPraiseFlag: '@boolean|1-2', //是否点赞

              topicId: 0, //话题id
              topicName: "'@ctitle(1, 20)", //话题名称

              userId: '@integer(1, 100000)',
              username: '@cname()',
              userAvatar: "@image('200x100')",
              userAge: '@integer(1, 100)',

              comment: [
                {
                  id: '@integer(1, 10000)', //记录id
                  fromUsername: '@cparagraph(2, 8)', //评论者名称
                  content: '@cparagraph(2, 8)', //评论/回复 内容
                  isComment: '@boolean|1-2', //true：评论，false：回复
                  toUsername: '@cname()',
                },
              ],
            },
          ],
          total: 47,
          totalPage: 2,
        },
        success: true,
      },
    },
  ],
}
