const Utils = require('../utils')
const pool = Utils.pool


const getCommentsOfTweet = (request, response) => {
    const id = parseInt(request.params.id)
    if (id === null || id === '') {
        console.log('Id null')
        response.status(400).json({
            'message': 'The tweet id can\'t be null or empty'
        })
        return
    }
    pool.query('SELECT * FROM comments ORDER BY id_post ASC', (error, results) => {
        if (error) {
            sendErrorResponse(response, error)
            return
        }
        response.status(200).json(results.rows)
    })
}

const getCommentById = (request, response) => {
    const id = parseInt(request.params.id)
    if (id === null || id === '') {
        console.log('Id null')
        response.status(400).json({
            'message': 'The id can\'t be null or empty'
        })
        return
    }

    pool.query('SELECT * FROM comments WHERE id = $1', [id], (error, results) => {
        if (error) {
            sendErrorResponse(response, error)
            return
        }
        response.status(200).json(results.rows)
    })
}

const createCommentForTweet = (request, response) => {
    
    const id = parseInt(request.params.id)
    const {
        media_url,
        id_user,
        creation_date,
        message
    } = request.body
    if (id === null || id === '' || id_user === null || id_user === '' || message === null || message === '') {
        console.log('Id null')
        response.status(400).json({
            'message': 'The tweet id, the user id and the message can\'t be null or empty'
        })
        return
    }
    console.log(request.body)
    pool.query('INSERT INTO comments (media_url, id_user,creation_date,modified,message,id_parent) VALUES ($1,$2,$3,false,$4,$5)RETURNING id_post',
        [media_url, id_user, creation_date, modified, message,id], (error, results) => {
            if (error) {
                sendErrorResponse(response, error)
                return
            }
            response.status(201).json(results.rows)
        })
}

const updateComment = (request, response) => {
    const id = parseInt(request.params.id)
    const {
        media_url,
        id_user,
        creation_date,
        message
    } = request.body
    if (id === null || id === '' || id_user === null || id_user === '' || message === null || message === '') {
        console.log('Id null')
        response.status(400).json({
            'message': 'The comment id, the user id and the message can\'t be null or empty'
        })
        return
    }
    pool.query(
        'UPDATE comments SET media_url = $1, id_user = $2,creation_date = $3,modified = true,message = $5 WHERE id = $6',
        [media_url, id_user, creation_date, modified, message, id],
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
    const id = parseInt(request.params.id)
    if (id === null || id === '') {
        console.log('Id null')
        response.status(400).json({
            'message': 'The id can\'t be null or empty'
        })
        return
    }
    pool.query('DELETE FROM comments WHERE id = $1', [id], (error, results) => {
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