const express = require("express");
const roleCheck = require("../middlewares/roleMiddleware");

const router = express.Router();

/**
 * @swagger
 * /details/public:
 *   get:
 *     summary: Public page accessible to all roles
 *     responses:
 *       200:
 *         description: Public page content
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "This is a public page."
 */
router.get("/public", roleCheck(["admin", "user", "guest"]), (req, res) => {
  res.send("This is a public page.");
});

/**
 * @swagger
 * /details/profile:
 *   get:
 *     summary: User profile page accessible to admin and user roles
 *     responses:
 *       200:
 *         description: Profile page content
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Welcome to your Profile!"
 *       403:
 *         description: Insufficient role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Forbidden: Insufficient Role"
 */
router.get("/profile", roleCheck(["admin", "user"]), (req, res) => {
  res.send("Welcome to your Profile!");
});

/**
 * @swagger
 * /details/dashboard:
 *   get:
 *     summary: Admin dashboard accessible only to admin role
 *     responses:
 *       200:
 *         description: Dashboard content
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Welcome to the Admin Dashboard!"
 *       403:
 *         description: Insufficient role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Forbidden: Insufficient Role"
 */
router.get("/dashboard", roleCheck(["admin"]), (req, res) => {
  res.send("Welcome to the Admin Dashboard!");
});

module.exports = router;
