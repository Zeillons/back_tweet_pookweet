const express = require('express');
const dbTweet = require('./querries/tweet-queries');
const dbComment = require('./querries/comment-queries');
const dbTimeline = require('./querries/timeline-queries');


exports.router = (
    function () {
        let apiRouter = express.Router();

    /**
     * create tweet
     * @route POST /tweets/{id}
     * @param {String} id.route.required - user id
     * @param {String} tweet.form-data - tweet desciption
     * @returns {object} 201 - The inserted ID
     * @returns {object} 500 - Internal error
     * @security JWT
     */
        apiRouter.route('/tweets').post(dbTweet.createTweet);
    /**
     * update tweet
     * @route PUT /tweets/{id}
     * @param {String} id.route.required - user id
     * @param {String} tweet.form-data - tweet desciption
     * @returns {object} 201 - The modified ID
     * @returns {object} 500 - Internal error
     * @security JWT
     */
    /**
     * update user profile
     * @route DELETE /tweets/{id}
     * @param {String} id.route.required - user id
     * @returns {object} 200 - Tweet deleted
     * @returns {object} 500 - Internal error
     * @security JWT
     */
    /**
     *  get tweet
     * @route GET /tweets/{id}
     * @param {String} id.route.required - tweet id
     * @returns {Object} 200 - A tweet
     * @returns {Object} 500 - Internal error
     * @security JWT
     */
        apiRouter.route('/tweets/:id').get(dbTweet.getTweetById)
            .put(dbTweet.updateTweet)
            .delete(dbTweet.deleteTweet);
        //TODO : route a faire
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