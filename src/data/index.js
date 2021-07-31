module.exports = {
  bbs: [
    {
      url:
        "/user/get-post-comment-praise",
      regex: true,
      desc: "@title(5)",
      method: "GET",
      delay: 1000,
      req: {
        pageNo: "@date('yyyy-MM-dd')",
        pageSize: "all",
        type: "all",
        userId: "all"
      },
      mock: true,
      res: {
        code: 200,
        info: "Get data success",
        data: {
          current: 1,
          "data|0-100": [
            {
              id: "@integer(1, 1000000)", //记录id
              content: "@cparagraph(2, 8)",//帖子内容
              "imagesUrl|0-9": [
                "@image('200x100')"
              ],//帖子图片

              commentNumber: "@integer(1, 100000)",//评论数
              forwardNumber: "@integer(1, 100000)",//转发数
              praiseNumber: "@integer(1, 100000)",//点赞数
              userPraiseFlag: "@boolean|1-2",//是否点赞

              topicId: 0,//话题id
              topicName: "'@ctitle(1, 20)",//话题名称

              userId: "@integer(1, 100000)",
              username: "@cname()",
              userAvatar: "@image('200x100')",
              userAge: "@integer(1, 100)",

              comment: [
                {
                  id: "@integer(1, 10000)",//记录id
                  fromUsername: "@cparagraph(2, 8)",//评论者名称
                  content: "@cparagraph(2, 8)",//评论/回复 内容
                  isComment: "@boolean|1-2", //true：评论，false：回复
                  toUsername: "@cname()"
                }
              ]
            }
          ],
          total: 47,
          totalPage: 2,
        },
        success: true
      }
    },
  ]
};