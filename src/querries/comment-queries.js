const Utils = require('../utils')
const pool = Utils.pool
const jwt = require('jsonwebtoken');

const getCommentsOfTweet = (request, response) => {
    const id = request.params.id
    if (id === null || id === '' || id === undefined) {
        console.log('Id null')
        response.status(400).json({
            'message': 'The tweet id can\'t be null or empty'
        })
        return
    }
    pool.query('SELECT * FROM comments WHERE id_parent = $1',[id], (error, results) => {
        if (error) {
            sendErrorResponse(response, error)
            return
        }
        response.status(200).json(results.rows)
    })
}

const getCommentById = (request, response) => {
    const id = request.params.id
    if (id === null || id === '' || id === undefined) {
        console.log('Id null')
        response.status(400).json({
            'message': 'The id can\'t be null or empty'
        })
        return
    }

    pool.query('SELECT * FROM comments WHERE id_post = $1', [id], (error, results) => {
        if (error) {
            sendErrorResponse(response, error)
            return
        }
        response.status(200).json(results.rows)
    })
}

const createCommentForTweet = (request, response) => {
    const id_user = jwt.decode(request.headers.authorization.split(" ")[1]).sub
    const id = request.params.id
    const {
        media_url,
        creation_date,
        message
    } = request.body
    const modified = false;
    if (id === null || id === '' || id === undefined
    || id_user === null || id_user === '' || id_user === undefined ||
     message === null || message === '' || message === undefined) {
        console.log('Id null')
        response.status(400).json({
            'message': 'The tweet id, the user id and the message can\'t be null or empty'
        })
        return
    }
    console.log(request.body)
    pool.query('INSERT INTO comments (media_url, id_user,creation_date,modified,message,id_parent) VALUES ($1,$2,$3,$4,$5,$6)RETURNING id_post',
        [media_url, id_user, creation_date, modified, message,id], (error, results) => {
            if (error) {
                sendErrorResponse(response, error)
                return
            }
            response.status(201).json(results.rows)
        })
}

const updateComment = (request, response) => {
    const id_user = jwt.decode(request.headers.authorization.split(" ")[1]).sub
    const id = request.params.id
    const {
        media_url,
        creation_date,
        message
    } = request.body
    const modified = true
    if (id === null || id === '' || id === undefined 
    || id_user === null || id_user === '' ||id_user === undefined
    || message === null || message === '' || message === undefined) {
        console.log('Id null')
        response.status(400).json({
            'message': 'The comment id, the user id and the message can\'t be null or empty'
        })
        return
    }
    pool.query(
        'UPDATE comments SET media_url = $1, id_user = $2,creation_date = $3,modified = $4,message = $5 WHERE id_post = $6',
        [media_url, id_user, creation_date, modified, message,id],
        (error, results) => {
            if (error) {
                sendErrorResponse(response, error)
                return
            }
            response.status(200).json({
                'message': `Comment modified with ID: ${id}`
            })
        }
    )
}
const deleteComment = (request, response) => {
    const id = request.params.id
    if (id === null || id === '' || id === undefined) {
        console.log('Id null')
        response.status(400).json({
            'message': 'The id can\'t be null or empty'
        })
        return
    }
    pool.query('DELETE FROM comments WHERE id_post = $1', [id], (error, results) => {
        if (error) {
            sendErrorResponse(response, error)
            return
        }
        response.status(200).json({
            'message': `Comment deleted with ID: ${id}`
        })
    })
}
const sendErrorResponse = (response, error) => {
    if (error.code === 'ETIMEDOUT') {
        response.status(504).json({
            'message': 'Database connection timed out'
        })
        return
    }
    response.status(500).json({
        'message': 'Erreur lors de la connection a la base de donnée : ${error}'
    })
}
module.exports = {
    getCommentsOfTweet,
    getCommentById,
    createCommentForTweet,
    updateComment,
    deleteComment,
}