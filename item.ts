import { Router } from "express";
import {db} from './db'

const router = Router()

type Item = {
    code: string,
    name?: string,
    tags?: string,
    description?: string,
}

db.exec(
  `CREATE TABLE IF NOT EXISTS item (
    id INTEGER PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    name TEXT,
    tags TEXT,
    description TEXT
  )`
)

const create = db.prepare(`INSERT INTO item (code, name, tags, description) VALUES (?, ?, ?, ?)`)

const get_all = db.prepare(`SELECT * FROM item`)
const get_id = db.prepare(`SELECT * FROM item WHERE id LIKE ?`)
const get_code = db.prepare(`SELECT * FROM item WHERE code LIKE ?`)
const get_tags = db.prepare(`SELECT * FROM item WHERE tags LIKE ?`)

const update_id = db.prepare('UPDATE item SET code=?, name=?, tags=?, description=? WHERE id=?')

const delete_id = db.prepare('DELETE FROM item WHERE id=?');

router.post('/create', (req, res) => {
    try 
    {
        const payload: Item = req.body
        create.run(payload.code, payload.name, payload.tags, payload.description)
        res.status(201).location(`/code/${payload.code}`).send(payload)
    }
    catch (e) 
    {
        const m = `[ERROR] ${e}`
        console.log(m)
        res.status(500).send(m)
    }
})

router.get('/all', (req, res) => {
    try 
    {
        const query_result = get_all.all()
        res.status(200).send(query_result)
    }
    catch (e) 
    {
        const m = `[ERROR] ${e}`
        console.log(m)
        res.status(500).send(m)
    }
})

router.get('/id/:id', (req, res) => {
    try 
    {
        const id = req.params.id
        const query_result = get_id.get(id)
        res.status(200).send(query_result)
    }
    catch (e) 
    {
        const m = `[ERROR] ${e}`
        console.log(m)
        res.status(500).send(m)
    }
})

router.get('/code/:code', (req, res) => {
    try 
    {
        const code = req.params.code
        const query_result = get_code.get(code)
        res.status(200).send(query_result)
    }
    catch (e) 
    {
        const m = `[ERROR] ${e}`
        console.log(m)
        res.status(500).send(m)
    }
})

router.get('/tags/:tags', (req, res) => {
    try 
    {
        const tags = req.params.tags
        const query_result = get_tags.all(tags)
        res.status(200).send(query_result)
    }
    catch (e) 
    {
        const m = `[ERROR] ${e}`
        console.log(m)
        res.status(500).send(m)
    }
})

router.put('/update/id/:id', (req, res) => {
    try 
    {
        const id = req.params.id
        const payload:Item = req.body
        update_id.run(payload.code, payload.name, payload.tags, payload.description, id)
        res.status(201).location(`/id/${id}`).send(get_id.get(id))
    }
    catch (e) 
    {
        const m = `[ERROR] ${e}`
        console.log(m)
        res.status(500).send(m)
    }
})

router.delete('/delete/id/:id', (req, res) => {
    try 
    {
        const id = req.params.id
        delete_id.run(id)
        res.sendStatus(204)
    }
    catch (e) 
    {
        const m = `[ERROR] ${e}`
        console.log(m)
        res.status(500).send(m)
    }
})

export default router