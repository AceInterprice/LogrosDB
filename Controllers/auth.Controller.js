import * as authService from '../Services/auth.Service.js'; 

export async function register(req, res) {
    try{
        const {names, first_last_name, second_last_name, email, password, role} = req.body;

        if (role === "ADMIN") {
          if (!req.user || req.user.role !== "ADMIN") {
            return res.status(403).json({
              error: "No tienes permisos para crear un ADMIN"
            });
          }
        }

        const user = await authService.register({
                names, 
                first_last_name, 
                second_last_name, 
                email,
                password,
                role
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

export async function login(req, res) {
    try{
       const {email, password} = req.body; 
       
       const data = await authService.login({
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

export async function forgotPassword(req, res){
  try{
    const {email} = req.body; 
    const data = await authService.forgotPassword(email); 

    return res.status(200).json(data); 
  }
  catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
}


