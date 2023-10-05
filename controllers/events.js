const {response} =require('express');
const Evento = require('../models/Evento');


const getEvents = async(req, res = response)=>{
    const eventos = await Evento.find().populate('user','name')
    res.status(201).json({
        ok:true,
        eventos
        });
}
const createEvent = async (req, res = response)=>{
    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save()
        res.status(201).json({
            ok:true,
            evento:eventoGuardado
            });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hable con el admin'
            });
    }

}
const updateEvent = async(req, res = response)=>{
    const eventoId =  req.params.id;
    const uid = req.uid
    try {
        const evento =await Evento.findById(eventoId)
        if (!evento){
            return res.status(404).json({
                ok:false,
                msg:'El id no existe'
                });
        }
        if (evento.user.toString() !== uid){
            return  res.status(401).json({
                ok:false,
                msg:'Este usuario no tiene autorizacion'
                });
        }
        const nuevoEvento = {
            ...req.body,
            user:uid
        }
        const eventoGuardado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new:true})
        res.json({
            ok:true,
            evento:eventoGuardado
            });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hable con el admin'
            });
    }
    
}
const deleteEvent = async(req, res = response)=>{
    const eventoId =  req.params.id;
    const uid = req.uid
    try {
        const evento =await Evento.findById(eventoId)
        if (!evento){
            return res.status(404).json({
                ok:false,
                msg:'El id no existe'
                });
        }
        if (evento.user.toString() !== uid){
            return  res.status(401).json({
                ok:false,
                msg:'Este usuario no tiene autorizacion'
                });
        }
        
        const eventoEliminado = await Evento.findByIdAndDelete (eventoId)
        res.json({
            ok:true,
            evento:eventoEliminado
            });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hable con el admin'
            });
    }
}

module.exports={
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}