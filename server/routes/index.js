
function getPath(file){
    return require('./route/' + file);
}
module.exports = function (app) {
        
    app.use('/signup', getPath('signup'));
    app.use('/signin', getPath('signin'));
    app.use('/signout',getPath('signout'));
    app.use('/gettoken',getPath('./gettoken'));    
    app.use('/get_user_info',getPath('getuserinfo'));
    app.use('/article',getPath('article'));
    app.use('/upload',getPath('upload'));
    app.use('/comment',getPath('./comment'));
    app.use('/search',getPath('./search'));
    app.use('/hobby',getPath('./hobby'));
};
