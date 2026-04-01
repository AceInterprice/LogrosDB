import * as authService from '../Services/auth.Service.js'; 

export async function registro(req, res) {
    try{
        const {names, first_last_name, second_last_name, email, password} = req.body;

        const user = await authService.registro({
                names, 
                first_last_name, 
                second_last_name, 
                email,
                password
            });

         return res.status(201).json({
            message: "Usuario creado exitosamente", 
            user
         });
    } catch(error){
    return res.status(400).json({
      error: error.message
    });
  }
}

export async function inicio_sesion(req, res) {
    try{
       const {email, password} = req.body; 
       
       const data = await authService.inicio_sesion({
         email, 
         password
       });

       return res.status(200).json(data); 

    } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
}
