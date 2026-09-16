import express from "express";
const router = express.Router();
import memberController from "./controllers/member.controller";
import uploader from "./libs/utils/uploader";
import motorcycleController from "./controllers/motorcycle.controller";
import orderController from "./controllers/order.controller";

/*
╔════════════════════════════════════════════════════════╗
║                      M E M B E R                       ║
╚════════════════════════════════════════════════════════╝
*/
router.get("/member/admin", memberController.getAdmin);
router.post("/member/login", memberController.login);
router.post("/member/signup", memberController.signup);
router.post("/member/logout", memberController.logout);
router.get(
  "/member/detail",
  memberController.verifyAuth,
  memberController.getMemberDetail,
);
router.post(
  "/member/update",
  memberController.verifyAuth,
  uploader("members").single("memberImage"),
  memberController.updateMember,
);
router.get("/member/top-users", memberController.getTopUsers);
/*
╔════════════════════════════════════════════════════════╗
║                     P R O D U C T                      ║
╚════════════════════════════════════════════════════════╝
*/
router.get("/motorcycle/all", motorcycleController.getMotorcycles);
router.get(
  "/motorcycle/:id",
  memberController.retrieveAuth,
  motorcycleController.getMotorcycle,
);
/*
╔════════════════════════════════════════════════════════╗
║                      O R D E R                         ║
╚════════════════════════════════════════════════════════╝
*/
router.post(
  "/order/create",
  memberController.verifyAuth,
  orderController.createOrder,
);
router.get(
  "/order/all",
  memberController.verifyAuth,
  orderController.getMyOrders,
);
router.post(
  "/order/update",
  memberController.verifyAuth,
  orderController.updateOrder,
);

export default router;
