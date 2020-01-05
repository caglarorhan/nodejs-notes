const User = require('../models/user');

exports.getUsersList= (req, res, next)=>{
        console.log(User.fetchAll());
    res.render('users-list', {
        pageTitle: 'Users List',
        path: '/admin/users-list',
        activeUsersList: true,
        usersCSS: true,
        users: User.fetchAll()
    });

}

exports.newUserForm = (req, res, next)=>{
    //sadece user ekleme formu olan sayfa render edilecek
    // responsa ait render metodu app icinde belirtilen 
    res.render('add-user', {
        pageTitle: 'Add new user',
        path: '/admin/add-user',
        activeUsersList: true,
        usersCSS: true
    })
}


exports.newUserSave = (req, res, next)=>{
    const user = new User(req.body.newUserName);
    user.save();
    res.redirect('/admin/users-list')
}

exports.adminMainEmptyPage = (req, res, next)=>{
    
    res.render('admin-main-page', {
        pageTitle: 'Admin Main Page',
        path: '/admin/admin-main-page',
        activeUsersList: true,
        usersCSS: true
    })
}