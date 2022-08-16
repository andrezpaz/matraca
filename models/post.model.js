// https://medium.com/@etiennerouzeaud/how-create-an-api-restfull-in-express-node-js-without-database-b030c687e2ea

const filename = '/home/andrez/SpiderOak Hive/codigos/javascript/COM/data/posts.json';
const filenamePostEmail = '/home/andrez/SpiderOak Hive/codigos/javascript/COM/data/postsEmail.json';
let posts = require('../data/posts.json')
let postsEmail = require('../data/postsEmail.json');
const helper = require('../helpers/helper.js');

function getPosts() {
    return new Promise((resolve, reject) =>{
        if (posts.length === 0) {
            reject({
                message: 'no posts available',
                status: 202
            })
        }
        resolve (posts)
    })
}

function getPostsEmail() {
    return new Promise((resolve, reject) =>{
        if (postsEmail.length === 0) {
            reject({
                message: 'no posts emails available',
                status: 202
            })
        }
        resolve (postsEmail)
    })
}

function getPost(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id)
        .then(post => resolve(post))
        .catch(err => reject(err))
    })
}

function getPostsRequester(requester) {
    return new Promise((resolve, reject) =>{
        const postsRequester = posts.filter( r => r.requester == requester)
        if (!postsRequester) {
            reject({
                message:'Not Foind',
                status: 404
            })
        }
        resolve(postsRequester)
        })
}

function insertPost(newPost) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(posts)}
        const date = {
            createdAt: helper.newDate(),
            updatedAt: helper.newDate()
        }
        newPost = {...id, ...date, ...newPost}
        posts.push(newPost)
        helper.writeJSONFile(filename, posts)
        resolve(newPost)
    })
}

function insertPostEmail(newPost) {
    return new Promise((resolve, reject) => {
        const id= { id: helper.getNewId(postsEmail)}
        const date = {
            createdAt: helper.newDate(),
            updatedAt: helper.newDate()
        }
        newPost = {...id, ...date, ...newPost}
        postsEmail.push(newPost)
        helper.writeJSONFile(filenamePostEmail, postsEmail)
        resolve(newPost)
    })
}
function updatePost(id, newPost) {
    return new Promise((resolve, reject) =>{
        helper.mustBeInArray(posts, id)
        .then(post => {
            const index = posts.findIndex(p => p.id == post.id)
            id = { id: post.id}
            const date = {
                createdAt: post.createdAt,
                updatedAt: helper.newDate()
            }
            const data = {
                requester: post.requester,
                msg: post.msg
            }
            posts[index] = { ...id, ...date, ...data, ...newPost}
            helper.writeJSONFile(filename, posts)
            resolve(posts[index])
        })
        .catch(err => reject(err))
    })
}

function updatePostChecked(id, newPost) {
    return new Promise((resolve, reject) =>{
        helper.mustBeInArray(posts, id)
        .then(post => {
            const index = posts.findIndex(p => p.id == post.id)
            id = { id: post.id}
            const date = {
                createdAt: post.createdAt,
                updatedAt: helper.newDate()
            }
            const data = {
                requester: post.requester,
                msg: post.msg
            }
            posts[index] = { ...id, ...date, ...data, ...newPost}
            helper.writeJSONFile(filename, posts)
            resolve(posts[index])
        })
        .catch(err => reject(err))
    })
}

function deletePost(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id)
        .then(() =>{
            posts = posts.filter(p => p.id != id)
            helper.writeJSONFile(filename, posts)
            resolve()
        })
        .catch( err => reject(err))
    })
}

module.exports = {
    insertPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
    updatePostChecked,
    insertPostEmail,
    getPostsEmail,
    getPostsRequester
}