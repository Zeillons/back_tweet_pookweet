const express = require('express');
const dbTweet = require('./querries/tweet-queries');
const dbComment = require('./querries/comment-queries');
const dbTimeline = require('./querries/timeline-queries');


exports.router = (
    function () {
        let apiRouter = express.Router();

        apiRouter.route('/tweets').post(dbTweet.createTweet);
        apiRouter.route('/tweets/:id').get(dbTweet.getTweetById)
            .put(dbTweet.updateTweet)
            .delete(dbTweet.deleteTweet);
        apiRouter.route('/tweets/users/:id_user').get(dbTweet.getTweetsUser)
        apiRouter.route('/tweets/users/:id_user/:from/:to').get(dbTweet.getTweetsUserFromXToY)

        apiRouter.route('/tweets/:id/comments').get(dbComment.getCommentsOfTweet)
            .post(dbComment.createCommentForTweet);
        apiRouter.route('/comments/:id').get(dbComment.getCommentById)
            .put(dbComment.updateComment)
            .delete(dbComment.deleteComment);

        apiRouter.route('/timeline/:from/:to').get(dbTimeline.getTimelineTweetIdFromXToY);

        return apiRouter;
    });