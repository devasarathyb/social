import { db } from '../connect.js'
import jwt from "jsonwebtoken"

export const getUser = (req, res) => {
    const userId = req.params.userId;
    const q = "select * from users where id=?"

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err)

        const { password, ...info } = data[0];
        return res.json(info)


    })
}

export const updateUser = (req, res) => {
    const token = req.cookies.accessToken

    if (!token) return res.status(401).json('Not logged in')
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("token not valid")
        const q = "update users set `name`=? ,`city`=?, `website`=?, `profilepic`=?, `coverpic`=? where id = ?"
        db.query(q, [
            req.body.name,
            req.body.city,
            req.body.website,
            req.body.coverpic,
            req.body.profilepic,
            userInfo.id
        ], (err, data) => {
            if (err) res.status(500).json(err, 'err')
            return res.status(200).json("updated")

            //return res.status(403).json("you can update only urs")

        })


    })
}

