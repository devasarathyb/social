import { db } from "../connect.js"
import jwt from "jsonwebtoken"

export const getLikes = (req, res) => {






    const q = "select likeduserid from likes where likedpostid = ?"


    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err, 'err')


        return res.status(200).json(data.map(like => like.likeduserid))
    })


}


export const addLikes = (req, res) => {
    const token = req.cookies.accessToken

    if (!token) return res.status(401).json('Not logged in')

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("token not valid")



        const q = "insert into likes(`likeduserid`,`likedpostid`) values (?,?)"


        db.query(q, [userInfo.id, req.body.postId], (err, data) => {
            if (err) return res.status(500).json(err, 'err'); console.log(err)


            return res.status(200).json("post has been liked")
        })

    })
}

export const deleteLike = (req, res) => {
    const token = req.cookies.accessToken

    if (!token) return res.status(401).json('Not logged in')

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("token not valid")



        const q = "delete from likes where `likeduserid` = ? and `likedpostid` = ?"


        db.query(q, [userInfo.id,
        req.query.postId], (err, data) => {
            if (err) return res.status(500).json(err, 'err'); console.log(err)


            return res.status(200).json("post disliked")
        })

    })
}