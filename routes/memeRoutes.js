const express = require('express');
const memeController = require("../controllers/memeController");
const router = express.Router();



 /**
* @swagger
* /memes:
*   get:
*     tags:
*       - Memes
*     name: Latest 100 memes
*     summary: finds the latest 100 memes
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     responses:
*       200:
*         description: successful query
*       400:
*         description: Bad Request
*
* 
*   post:
*     tags:
*       - Memes
*     name: posting a meme
*     summary: Posts a meme
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             name:
*               type: string
*             caption:
*               type: string
*             url:
*               type: string
*         required:
*           - name
*           - url
*           - caption
*     responses:
*       200:
*         description: Meme posted successfully
*       406:
*         description: All the data fields are required
*       409:
*         description: Duplicate Data
*
* /memes/{id}:
*   patch:
*     tags:
*       - Memes
*     name: Update a Meme
*     summary: Update a Meme
*     consumes:
*       - application/json
*     parameters:
*       - in : path
*         name : id
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             caption:
*               type: string
*             url:
*               type: string
*     responses:
*       200:
*         description: Meme updated successfully
*       404:
*         description: Not found in the db
*       406:
*         description: All the data fields are required
*
*
*   get:
*     tags:
*       - Memes
*     name: Get a particular meme
*     summary: Get a particular meme
*     consumes:
*       - application/json
*     parameters:
*       - in : path
*         name : id
*     responses:
*       200:
*         description: Success
*       400:
*         description: Id not found
*
* /search/{string}:
*   get:
*     tags:
*       - Memes
*     name: Result of search in meme database
*     summary: Result of search in meme database
*     consumes:
*       - application/json
*     parameters:
*       - in : path
*         name : string
*     responses:
*       200:
*         description: Search successful
*       404:
*         description: Id not found
*
* /delete/{id}:
*   delete:
*     tags:
*       - Memes
*     name: Delete a meme with given id
*     summary: Delete a meme with given id
*     consumes:
*       - application/json
*     parameters:
*       - in : path
*         name : id
*     responses:
*       200:
*         description: Deleted successfully
*       404:
*         description: Id not found
*/

router.route('/').get(async function(req,res,next){ res.send("Hello form the server"); res.end();})
router.route('/memes').get(memeController.getMeme).post(memeController.addMeme)
router.route('/memes/:id').get(memeController.getParticularMeme).patch( memeController.updateParticularMeme );
router.route('/search/:string').get(memeController.searchMeme);
router.route('/delete/:id').delete(memeController.deleteMeme);
module.exports = router

