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
     * @param {String} id.route.required - tweet id
     * @param {String} tweet.form-data - tweet desciption
     * @returns {object} 201 - The modified ID
     * @returns {object} 500 - Internal error
     * @security JWT
     */
    /**
     * update tweet
     * @route DELETE /tweets/{id}
     * @param {String} id.route.required - tweet id
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
        /**
     *  get tweet of user
     * @route GET /tweets/users/{id}
     * @param {String} id.route.required - tweet id
     * @returns {Object} 200 - A tweet
     * @returns {Object} 500 - Internal error
     * @security JWT
     */
        apiRouter.route('/tweets/users/:id_user').get(dbTweet.getTweetsUser)
        /**
     *  get tweet of user from first index to last index
     * @route GET /tweets/users/{id}/{from}/{to}
     * @param {String} id.route.required - tweet id
     * @param {int} from.route.required - index of first tweet (offset)
     * @param {int} to.route.required - index of last tweet
     * @returns {Object} 200 - A list of tweets ids and dates
     * @returns {Object} 500 - Internal error
     * @security JWT
     */
        apiRouter.route('/tweets/users/:id_user/:from/:to').get(dbTweet.getTweetsUserFromXToY)
/**
     *  get tweet's comment
     * @route GET /tweets/{id}/comments
     * @param {String} id.route.required - tweet id
     * @returns {Object} 200 - A list of tweet's comments
     * @returns {Object} 500 - Internal error
     * @security JWT
     */
        /**
     * post a comment
     * @route POST /tweets/{id}/comments
     * @param {String} id.route.required - tweet id
     * @param {String} comment.form-data - comment desciption
     * @returns {object} 201 - The inserted ID
     * @returns {object} 500 - Internal error
     * @security JWT
     */
        apiRouter.route('/tweets/:id/comments').get(dbComment.getCommentsOfTweet)
            .post(dbComment.createCommentForTweet);
              /**
     * update tweet
     * @route PUT /comments/{id}
     * @param {String} id.route.required - comment id
     * @param {String} comment.form-data - comment desciption
     * @returns {object} 201 - The modified ID
     * @returns {object} 500 - Internal error
     * @security JWT
     */
    /**
     * update comments
     * @route DELETE /comments/{id}
     * @param {String} id.route.required - comment id
     * @returns {object} 200 - comment deleted
     * @returns {object} 500 - Internal error
     * @security JWT
     */
    /**
     *  get comments
     * @route GET /comments/{id}
     * @param {String} id.route.required - comment id
     * @returns {Object} 200 - A comment
     * @returns {Object} 500 - Internal error
     * @security JWT
     */
        apiRouter.route('/comments/:id').get(dbComment.getCommentById)
            .put(dbComment.updateComment)
            .delete(dbComment.deleteComment);

         /**
     *  get tweets of a timeline (uses follows)
     * @route GET /timeline/{from}/{to}
     * @param {int} from.route.required - index of first tweet (offset)
     * @param {int} to.route.required - index of last tweet
     * @returns {Object} 200 - A list of tweets ids and dates
     * @returns {Object} 500 - Internal error
     * @security JWT
     */
        apiRouter.route('/timeline/:from/:to').get(dbTimeline.getTimelineTweetIdFromXToY);

        return apiRouter;
    });