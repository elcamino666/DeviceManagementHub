import Database from '../db/index.js'
import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const devices = await Database.getDevices()
        return res.json(devices)
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})

router.post('/add', async (req, res) => {
    try {
        const { name, type, ownerName, batteryStatus } = req.body
        const device = await Database.addDevice({ name, type, ownerName, batteryStatus })
        return res.send(device)
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const device = await Database.getDeviceById(id)
        return res.json(device)
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})

router.delete('/delete', async (req, res) => {
    try {
        const { id } = req.body
        const success = await Database.removeDeviceById(id)
        return res.send({ success })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})

router.put('/update', async (req, res) => {
    try {
        const { id, name, type, ownerName, batteryStatus } = req.body
        const device = await Database.updateDeviceById({ id, name, type, ownerName, batteryStatus })
        return res.send(device)
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})

export default router
