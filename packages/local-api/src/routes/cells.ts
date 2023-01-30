import  path from 'path';
import express from 'express'
import fs from 'fs/promises'


type Cell ={
id: string,
content: string,
type: 'text'| 'code'
}

export const createCellsRouter = (fileName:string, dir: string)=> {
  const router = express.Router();
  router.use(express.json())

  const fullPath = path.join(dir, fileName)

  router.get('/cells', async (req,res)=> {
    try {
      const result = await fs.readFile(fullPath, {encoding: 'utf-8'})
      res.send(JSON.parse(result))
    } catch (err: any) {
        if (err.code === 'ENOENT'){
          await fs.writeFile(fullPath, '[]', {encoding
          : 'utf8'})
          res.send([])
        } else {
          throw err
        }
    }
  
})

  router.post('/cells', async (req,res)=> {
    const {cells}: {cells: Cell}= req.body;
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');
    // , 'utf-8' is the shorthand for {encoding  : 'utf8'} 

    res.send({status: 'ok'})
})
  return router
}

