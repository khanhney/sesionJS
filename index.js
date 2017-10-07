const express = require('express');
const app = express();
const bodyParser = require('body-parser').urlencoded({extended: false});

const session = require('express-session');



app.set('views','./views');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(session({
    secret: 'asdasfdaf236256asda1',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 5000
    }
}));


// có 2 loại middleware 
//1. bình thường chỉ qua các route thường
//2. qua tất cả router


// tạo 1 router chỉ qua admin
const adminRouter = (req, res, next)=>{
    console.log('This Is router admin');
    next();
}
app.get('/', (req, res)=> res.render('home'));
app.get('/admin/1', adminRouter, (req, res)=>{
    res.render('admin');
});
app.get('/admin/2', adminRouter, (req, res)=>{
    res.render('admin');
});

app.get('/dangnhap', (req, res)=>{
    req.session.checkDangNhap = true;
    res.render('dangnhap');
});

app.get('/private', (req, res)=>{
    const checkDangNhap = req.session.checkDangNhap;
    if(checkDangNhap === undefined) return res.redirect('/dangnhap');
    res.render('private');
})
app.listen(3000, ()=> console.log('Server started at port 3000'));
