import express from "express";
const routerAdmin = express.Router();
import adminController from "./controllers/admin.controller";
import motorcycleController from "./controllers/motorcycle.controller";
import makeUploader from "./libs/utils/uploader";

/* Admin */
routerAdmin.get("/", adminController.goHome);
routerAdmin
  .get("/login", adminController.getLogin)
  .post("/login", adminController.processLogin);
routerAdmin
  .get("/signup", adminController.getSignup)
  .post(
    "/signup",
    makeUploader("members").single("memberImage"),
    adminController.processSignup,
  );
routerAdmin.get("/logout", adminController.logout);
routerAdmin.get("/check-me", adminController.checkAuthSession);

/* Motorcycle */
routerAdmin.get(
  "/motorcycle/all",
  adminController.verifyAdmin,
  motorcycleController.getAllMotorcycles,
);
routerAdmin.post(
  "/motorcycle/create",
  adminController.verifyAdmin,
  makeUploader("motorcycles").array("motorcycleImages", 5),
  motorcycleController.createNewMotorcycle,
);
routerAdmin.post(
  "/motorcycle/:id",
  adminController.verifyAdmin,
  motorcycleController.updateChosenMotorcycle,
);

/* User */
routerAdmin.get(
  "/user/all",
  adminController.verifyAdmin,
  adminController.getUsers,
);
routerAdmin.post(
  "/user/edit",
  adminController.verifyAdmin,
  adminController.updateChosenUser,
);

export default routerAdmin;
