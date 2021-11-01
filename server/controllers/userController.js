const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit:100,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
});

exports.view = (req, res)=>{

    
pool.getConnection((err,connection)=>{
    if(err) throw err;
    console.log(`Connected as ID ${connection.threadId}`);
connection.query('SELECT * FROM users WHERE status="Active"',(err, rows)=>{
if(!err){
    res.render('home',{rows});
}else{
    console.log(err);
}
console.log('data from user table1: \n', rows);
});
});
}
exports.find = (req, res)=>{    
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        else console.log(`Connected as ID ${connection.threadId}`);
        let searchItem  = req.body.search;
    connection.query('SELECT * FROM users WHERE fname LIKE ? OR lname LIKE ?',['%'+searchItem+'%','%'+searchItem+'%'],(err, rows)=>{
    if(!err){
        res.render('home',{rows});
    }else{
        console.log(err);
    }
    console.log('data from user table2: \n', rows);
    });
    
    });
    
    
}

exports.form = (req, res)=>{  
    res.render('add-user')
  }


exports.create = (req, res)=>{  
    const{fname, lname, email, phone, comments} = req.body;
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        else console.log(`Connected as ID ${connection.threadId}`);
        let searchItem  = req.body.search;
    connection.query('INSERT INTO users SET fname= ?, lname = ?, email = ?, phone = ?, comments = ?',[fname,lname,email,phone,comments],(err, rows)=>{
    if(!err){
        res.render('/',{rows});
    }else{
        console.log(err);
    }
    console.log('data from user table3s: \n', rows);
    });
    
    });
  }
  exports.edit = (req, res)=>{ 

    // res.render('edit-user')
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        else console.log(`Connected as ID ${connection.threadId}`);
        let searchItem  = req.body.search;
    connection.query('SELECT * FROM users WHERE id= ?',[req.params.id],(err, rows)=>{
    if(!err){
        res.render('edit-user',{rows});
    }else{
        console.log(err);
    }
    console.log('data from user table4: \n', rows);
    });
    
    });

   }
  exports.update = (req, res)=>{ 
    
    // res.render('edit-user')
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        
        else console.log(`Connected as ID ${connection.threadId}`);
        const{fname, lname, email, phone, comments} = req.body;
        let searchItem  = req.body.search;
    connection.query('UPDATE users SET fname= ?, lname = ?, email = ?, phone = ?, comments = ? WHERE id= ?',[fname,lname,email,phone,comments,req.params.id],(err, rows)=>{
    if(!err){
        pool.getConnection((err,connection)=>{
            if(err) throw err;
            else console.log(`Connected as ID ${connection.threadId}`);
            let searchItem  = req.body.search;
        connection.query('SELECT * FROM users WHERE id= ?',[req.params.id],(err, rows)=>{
        if(!err){
            res.render('edit-user',{rows});
        }else{
            console.log(err);
        }
        console.log('data from user table5: \n', rows);
        });
        
        });
    }else{
        console.log(err);
    }
    console.log('data from user table6: \n', rows);
    });
    
    });

   }

   exports.delete = (req, res)=>{ 

    // res.render('edit-user')
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        else console.log(`Connected as ID ${connection.threadId}`);
        let searchItem  = req.body.search;
    connection.query('DELETE FROM users WHERE id= ?',[req.params.id],(err, rows)=>{
    if(!err){
        res.redirect('/');
    }else{
        console.log(err);
    }
    console.log('data from user table7: \n', rows);
    });
    
    });

   }

   exports.viewuser = (req, res)=>{ 

    // res.render('edit-user')
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        else console.log(`Connected as ID ${connection.threadId}`);
        let searchItem  = req.body.search;
    connection.query('SELECT * FROM users WHERE id= ?',[req.params.id],(err, rows)=>{
    if(!err){
        res.render('view-user',{rows});
    }else{
        console.log(err);
    }
    console.log('data from user table8: \n', rows);
    });
    
    });

   }