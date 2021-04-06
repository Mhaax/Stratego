const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST, 
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.login = async (req, res) =>{
    try {
        const{username, password} = req.body;

        if( !username || !password ) {
            return res.status(400).render('login', {
                message: "S'il vous plait fournissez un Pseudo et un mot de passe !"
            })
        }
    
        db.query('SELECT * FROM compte WHERE Pseudo = ?', [username], async (error, results) => {

            if(results.length==0) {
                res.status(401).render('login', {
                    message: 'Le mot de passe ou le pseudo est incorrecte'
                })
            } else if( !(await bcrypt.compare(password, results[0].Password ) )){
                res.status(401).render('login', {
                    message: 'Le mot de passe ou le pseudo est incorrecte'
                })
            } else {
                const id = results[0].id;

                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log("The token is: "+ token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions );

                res.status(200).redirect("/game_init.html");
            }
        })

    } catch (error) {
        console.log(error);
    }
}




exports.register = (req, res) => {
    
    const { username, email, password, password_c} = req.body;
    let validate = 0;

    db.query('SELECT Email FROM compte WHERE Email = ?', [email], (error, results) => {
        if(error){
            console.log(error);
        }

        if( results.length > 0){
            return res.render('register', {
                rouge: 'Cet email est déjà utilisé !',
            })
        } else if(password !== password_c){
            return res.render('register', {
                rouge: 'Les mots de passes ne correspondent pas !',
            });
        }

        db.query('SELECT Pseudo FROM compte WHERE Pseudo = ?', [username], async (error2, results2) => {
            if(error2){
                console.log(error2);
            }else if( results2.length > 0 ){
                console.log(results2);
                validate = 1;
                return res.render('register', {
                    rouge: 'Le Pseudo est déjà utilisé!',
                })
            } else if(validate == 0){
                console.log(validate)
                let hashedPassword = await bcrypt.hash(password, 8);
                console.log(hashedPassword);
                db.query('insert INTO compte SET ? ',{Pseudo: username, Password: hashedPassword, Email: email}, (error3, results3) => {
                        if(error3){
                            console.log(error3)
                        } else {
                            return res.render('register', {
                                vert: 'Compte enregistré avec succès',
                            });
                        }
                })
           }
        })


        
    })

}