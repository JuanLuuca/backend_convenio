import { ControllerLoginCompany } from "../controller/LoginCompanyController";
import * as express from "express";

const router = express();

router.post("/login", ControllerLoginCompany.getLoginCompany);

export default router;
