import {
    db
} from "../connect.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const login = (req, res) => {
    const q = "select * from users where username=?"

    db.query(q, [req.body.username], (err, data) => {
        if (err) res.status(500).json(err)
        if (data.length === 0) res.status(501).json("user not found")


        const checkPassword = bcrypt.compare(req.body.password, data[0].password)

        
        if (!checkPassword) return res.status(400).json("wrong password")

        const token = jwt.sign({
            id: data[0].id
        },
            "secretkey"
        )
        const {
            password,
            ...others
        } = data[0]

        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(others)
    })
}

export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("logged out")

}


export const register = (req, res) => {


    //check if user exists
    //create a new user

    // if new hash password

    const q = "select * from users where username= ?"

    db.query(q, [req.body.username], (err, data) => {
        if (err) {
            return res.status(500).json(err)

        }

        if (data.length) return res.status(409).json("user already exists")

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)


        const q = "insert into users (`username`, `email`,`password`, `name`) values (?, ? ,? ,?)"

        const values = [req.body.username, req.body.email, hashedPassword, req.body.name]

        db.query(q, values, (err, data) => {
            if (err) {
                return res.status(500).json(err)

            }
            return res.status(200).json("user created")
        })
    })
}