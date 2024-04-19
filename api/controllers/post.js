import moment from 'moment/moment.js'
import { db } from '../connect.js'
import jwt from "jsonwebtoken"

export const getPosts = (req, res) => {
    const userId = req.query.userId
    const token = req.cookies.accessToken

    if (!token) return res.status(401).json('Not logged in')

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("token not valid")




        const q = userId ? `select p.*, u.id as userId, name,profilePic from posts as p join users as u on (u.id = p.userId  ) where p.userId = ?` : `select p.*, u.id as userId, name,profilePic from posts as p join users as u on (u.id = p.userId  )
       left join relationships as r on (p.userid = r.followeduserid ) where r.followeruserid=? or p.userid=? order by p.createdAt desc`

        const values = userId ? [userId] : [userInfo.id, userInfo.id]
        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);


            return res.status(200).json(data)
        })

    })
}

export const addPosts = (req, res) => {
    const token = req.cookies.accessToken

    if (!token) return res.status(401).json('Not logged in')

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("token not valid")



        const q = "insert into posts(`desc`,`img`,`createdAt`,`userId`) values (?)"

        const values = [
            req.body.desc,
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id
        ]
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err)


            return res.status(200).json("post has been created")
        })

    })
}

export const deletePosts = (req, res) => {
    const token = req.cookies.accessToken

    if (!token) return res.status(401).json('Not logged in')

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("token not valid")



        const q = "delete from posts where `id` =? and `userId`=?"



        db.query(q, [req.params.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);


            if (data.affectedRows > 0) return res.status(200).json("post has been deleted")
            return res.status(403).json("delete urs only")
        })

    })
}

