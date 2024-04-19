import moment from 'moment/moment.js'
import { db } from '../connect.js'
import jwt from "jsonwebtoken"

export const getComments = (req, res) => {




  const q = `select c.*, u.id as userId, name,profilePic from comments as c join users as u on (u.id = c.commentuserId  )
      where c.postId = ? order by c.createdAt desc`

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err)


    return res.status(200).json(data)
  })


}


export const addComment = (req, res) => {
  const token = req.cookies.accessToken

  if (!token) return res.status(401).json('Not logged in')

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("token not valid")



    const q = "insert into comments(`desc`,`createdAt`,`commentuserId`,`postId`) values (?)"

    const values = [
      req.body.desc,

      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.postId
    ]
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err, 'err')


      return res.status(200).json("comment has been created")
    })

  })
}