import { appBackend } from "./src/config/server.js";

appBackend.listen(appBackend.get("port"), ()=>{
    console.log(`Server is running on port ${appBackend.get("port")}`);
    console.log(`enter to: http://localhost:${appBackend.get("port")}`)    
})