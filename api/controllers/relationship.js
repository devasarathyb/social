import { db } from "../connect.js"
import jwt from "jsonwebtoken"

export const getRelationships = (req, res) => {






    const q = "select followeruserid from relationships where followeduserid = ?"


    db.query(q, [req.query.followeduserid], (err, data) => {
        if (err) return res.status(500).json(err, 'err')


        return res.status(200).json(data.map(relationship => relationship.followeruserid))
    })


}


export const addRelationships = (req, res) => {
    const token = req.cookies.accessToken

    if (!token) return res.status(401).json('Not logged in')

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("token not valid")



        const q = "insert into relationships(`followeruserid`,`followeduserid`) values (?,?)"


        db.query(q, [userInfo.id, req.body.userId], (err, data) => {
            if (err) return res.status(500).json(err, 'err'); console.log(err)


            return res.status(200).json("following")
        })

    })
}

export const deleteRelationships = (req, res) => {
    const token = req.cookies.accessToken

    if (!token) return res.status(401).json('Not logged in')

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("token not valid")



        const q = "delete from relationships where `followeruserid` = ? and `followeduserid` = ?"



        db.query(q, [userInfo.id,
        req.query.userId], (err, data) => {
            if (err) { return res.status(500).json(err, 'err'); console.log(err, 'coming') }


            return res.status(200).json("unfollow");
        })

    })
}