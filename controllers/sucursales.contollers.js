import Sucursales from "../models/Sucursales";

const postSucursales = async (req, res) => {
    try {
        const { nombre, direccion, ciudad, telefono, email, gerente } = req.body;
        const sucursal = new Sucursales({nombre, direccion, ciudad, telefono, email, gerente});

        const existeNombre = await Sucursales.findOne({nombre});
        if(existeNombre){
            return res.status(400).json({msg:"El nombre de la sucursal ya está registrado"})
        }

        await sucursal.save();
        res.json(sucursal);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al intentar registrar la sucursal');
    }
}

const putSucursales = async (req, res) => {
    try {
        const { nombre } = req.body;

        const existeNombre = await Sucursales.findOne({nombre});
        if(existeNombre){
            return res.status(400).json({msg:"El nombre de la sucursal ya está registrado"})
        }

        const sucursales = await Sucursales.findByIdAndUpdate({_id:req.params.id},req.body,{new:true});
        res.json({message:"sucursales actualizada",sucursales});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al intentar actualizar la sucursal');
    }
}

const deleteSucursales = async (req,res)=>{
    try {
        await Categoria.findByIdAndDelete({_id:req.params.id});
        res.json({message:"eliminado"});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al intentar actualizar la sucursal');
    }

}

export {postSucursales, putSucursales , deleteSucursales };